import {
  Controller,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  HttpCode,
  UseGuards,
  ForbiddenException,
  Put,
} from '@nestjs/common';
import { ItineraryCommentsService } from './itinerary-comments.service';
import { IsLoggedInGuard } from 'src/guards/isLoggedIn.guard';
import { ItinerariesService } from '../itineraries/itineraries.service';
import { PlainBody } from 'src/decorators/plainBody.decorator';
import { User as UserD } from 'src/decorators/user.decorator';
import { User } from '../users/entity/user.entity';
import { ItineraryCommentExistsGuard } from 'src/guards/commentExists.guard';

@Controller('itinerary-comment')
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

  @Put(':id')
  @UseGuards(ItineraryCommentExistsGuard)
  async putComment(
    @Param('id', ParseIntPipe) commentId: number,
    @UserD() user: User,
    @PlainBody() comment: string,
  ) {
    if (
      await this.itinerariesCommentsService.belongsToUser(commentId, user.id)
    ) {
      await this.itinerariesCommentsService.updateOne(commentId, comment);
    } else {
      throw new ForbiddenException(
        'You are not allowed to update this comment',
      );
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(ItineraryCommentExistsGuard)
  async deleteComment(
    @Param('id', ParseIntPipe) commentId: number,
    @UserD() user: User,
  ) {
    if (
      await this.itinerariesCommentsService.belongsToUser(commentId, user.id)
    ) {
      await this.itinerariesCommentsService.deleteOne(commentId);
    } else {
      throw new ForbiddenException(
        'You are not allowed to delete this comment',
      );
    }
  }
}
