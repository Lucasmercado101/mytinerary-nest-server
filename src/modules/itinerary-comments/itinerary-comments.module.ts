import { Module } from '@nestjs/common';
import { ItineraryCommentsService } from './itinerary-comments.service';
import { ItineraryCommentsController } from './itinerary-comments.controller';
import { ItinerariesModule } from '../itineraries/itineraries.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItineraryComment } from './entities/itinerary-comment.entity';
import { UsersModule } from '../users/users.module';
import { SessionsService } from '../sessions/sessions.service';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItineraryComment]),
    ItinerariesModule,
    UsersModule,
    SessionsModule,
  ],
  controllers: [ItineraryCommentsController],
  providers: [ItineraryCommentsService],
})
export class ItineraryCommentsModule {}
