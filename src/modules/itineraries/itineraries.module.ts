import { Module } from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
import { ItinerariesController } from './itineraries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Itinerary } from './entities/itinerary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Itinerary])],
  providers: [ItinerariesService],
  controllers: [ItinerariesController],
})
export class ItinerariesModule {}
