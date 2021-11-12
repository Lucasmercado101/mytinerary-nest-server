import {
  Controller,
  Post,
  Param,
  NotFoundException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PlainBody } from 'src/decorators/plainBody.decorator';
import { IsLoggedInGuard } from 'src/guards/isLoggedIn.guard';
import { ItineraryExistsGuard } from 'src/guards/itineraryExists.guard';
import { ItinerariesCommentsService } from './itineraries-comments.service';
import { ItinerariesService } from './itineraries.service';

@Controller('itinerary/:id/comment')
@UseGuards(ItineraryExistsGuard)
export class ItinerariesCommentsController {
  constructor(
    private readonly itinerariesService: ItinerariesService,
    private readonly itinerariesCommentsService: ItinerariesCommentsService,
  ) {}

  @Post()
  @UseGuards(IsLoggedInGuard)
  async createComment(
    @Param('id', ParseIntPipe) id: number,
    @PlainBody() comment: string,
  ) {
    const itinerary = await this.itinerariesService.findOneById(id);
    if (!comment) {
      throw new NotFoundException('Comment is required');
    }
    return this.itinerariesCommentsService.createOne({
      author_id: id,
      comment,
      itinerary: itinerary,
    });
  }
}
