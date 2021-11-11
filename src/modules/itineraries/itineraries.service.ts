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

  createOne(createItineraryDto: Omit<Itinerary, 'id'>) {
    return this.itinerariesRepository.save(createItineraryDto);
  }

  findOneById(id: number) {
    return this.itinerariesRepository.findOne(id);
  }

  update(id: number, updateItineraryDto: UpdateItineraryDto) {
    return `This action updates a #${id} itinerary`;
  }

  remove(id: number) {
    return `This action removes a #${id} itinerary`;
  }
}
