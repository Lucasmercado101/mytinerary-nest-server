import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ItineraryCommentsService } from './itinerary-comments.service';
import { ItineraryExistsGuard } from 'src/guards/itineraryExists.guard';
import { IsLoggedInGuard } from 'src/guards/isLoggedIn.guard';
import { ItinerariesService } from '../itineraries/itineraries.service';
import { PlainBody } from 'src/decorators/plainBody.decorator';

@Controller('itinerary-comments')
@UseGuards(ItineraryExistsGuard)
@UseGuards(IsLoggedInGuard)
export class ItineraryCommentsController {
  constructor(
    private readonly itinerariesService: ItinerariesService,
    private readonly itinerariesCommentsService: ItineraryCommentsService,
  ) {}

  @Post()
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

  @Delete(':commentId')
  @HttpCode(204)
  async deleteComment(@Param('commentId', ParseIntPipe) commentId: number) {
    await this.itinerariesCommentsService.deleteOne(commentId);
  }
}
