import {
  Controller,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ItineraryCommentsService } from './itinerary-comments.service';
import { IsLoggedInGuard } from 'src/guards/isLoggedIn.guard';
import { ItinerariesService } from '../itineraries/itineraries.service';
import { PlainBody } from 'src/decorators/plainBody.decorator';
import { User as UserD } from 'src/decorators/user.decorator';
import { User } from '../users/entity/user.entity';
import { ItineraryCommentExistsGuard } from 'src/guards/commentExists.guard';

@Controller('itinerary-comment')
@UseGuards(ItineraryCommentExistsGuard)
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

  @Delete(':id')
  @HttpCode(204)
  async deleteComment(
    @Param('id', ParseIntPipe) commentId: number,
    @UserD() user: User,
  ) {
    await this.itinerariesCommentsService.deleteOne(commentId);
  }
}
