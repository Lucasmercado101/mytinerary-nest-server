import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { Itinerary } from './entities/itinerary.entity';

@Injectable()
export class ItinerariesService {
  constructor(
    @InjectRepository(Itinerary)
    private itinerariesRepository: Repository<Itinerary>,
  ) {}

  public createOne(createItineraryDto: Omit<Itinerary, 'id'>) {
    return this.itinerariesRepository.save(createItineraryDto);
  }

  public findOneById(id: number) {
    return this.itinerariesRepository.findOne(id);
  }

  public findAll() {
    return this.itinerariesRepository.find();
  }

  public itineraryExists(id: number): Promise<boolean> {
    return this.itinerariesRepository
      .findOne(id)
      .then((itinerary) => !!itinerary);
  }
}
