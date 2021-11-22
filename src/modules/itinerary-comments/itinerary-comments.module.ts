import { Module } from '@nestjs/common';
import { ItineraryCommentsService } from './itinerary-comments.service';
import { ItineraryCommentsController } from './itinerary-comments.controller';

@Module({
  controllers: [ItineraryCommentsController],
  providers: [ItineraryCommentsService],
})
export class ItineraryCommentsModule {}
