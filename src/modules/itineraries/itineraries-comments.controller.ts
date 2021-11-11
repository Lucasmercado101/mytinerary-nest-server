import {
  Controller,
  Post,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { PlainBody } from 'src/decorators/plainBody.decorator';
import { ItinerariesCommentsService } from './itineraries-comments.service';
import { ItinerariesService } from './itineraries.service';

@Controller('itinerary/:id/comment')
export class ItinerariesCommentsController {
  constructor(
    private readonly itinerariesService: ItinerariesService,
    private readonly itinerariesCommentsService: ItinerariesCommentsService,
  ) {}

  @Post()
  async createComment(
    @Param('id', ParseIntPipe) id: number,
    @PlainBody() comment: string,
  ) {
    const itinerary = await this.itinerariesService.findOneById(id);
    if (!itinerary) {
      throw new NotFoundException(`Itinerary with id ${id} not found`);
    }
    if (!comment) {
      throw new NotFoundException('Comment is required');
    }
    return this.itinerariesCommentsService.createOne({
      author_id: id,
      comment,
    });
  }
}
