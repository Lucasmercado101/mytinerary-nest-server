import { Module } from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
import { ItinerariesController } from './itineraries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Itinerary } from './entities/itinerary.entity';
import { ItinerariesCommentsController } from './itineraries-comments.controller';
import { ItineraryComment } from './entities/comment.entity';
import { ItinerariesCommentsService } from './itineraries-comments.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Itinerary, ItineraryComment]),
    UsersModule,
  ],
  providers: [ItinerariesService, ItinerariesCommentsService],
  controllers: [ItinerariesController, ItinerariesCommentsController],
  exports: [ItinerariesService],
})
export class ItinerariesModule {}
