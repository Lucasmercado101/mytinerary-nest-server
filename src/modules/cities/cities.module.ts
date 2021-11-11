import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { SessionsModule } from 'src/modules/sessions/sessions.module';
import { UsersModule } from 'src/modules/users/users.module';
import { CityItinerariesController } from './city-itineraries.controller';
import { ItinerariesModule } from '../itineraries/itineraries.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([City]),
    SessionsModule,
    UsersModule,
    ItinerariesModule,
  ],
  controllers: [CitiesController, CityItinerariesController],
  providers: [CitiesService],
})
export class CitiesModule {}
