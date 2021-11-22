import { forwardRef, Module } from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
import { ItinerariesController } from './itineraries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { SessionsModule } from '../sessions/sessions.module';
import { Itinerary } from './entities/itinerary.entity';
import { ItineraryCommentsModule } from '../itinerary-comments/itinerary-comments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Itinerary]),
    UsersModule,
    SessionsModule,
    forwardRef(() => ItineraryCommentsModule),
  ],
  providers: [ItinerariesService],
  controllers: [ItinerariesController],
  exports: [ItinerariesService],
})
export class ItinerariesModule {}
