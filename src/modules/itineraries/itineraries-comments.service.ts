import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { Itinerary } from './entities/itinerary.entity';

@Injectable()
export class ItinerariesCommentsService {
  constructor(
    @InjectRepository(Itinerary)
    private itinerariesRepository: Repository<Itinerary>,
  ) {}
}
