import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateItineraryCommentDto } from './dto/create-comment.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { ItineraryComment } from './entities/comment.entity';
import { Itinerary } from './entities/itinerary.entity';
import { ItinerariesService } from './itineraries.service';

@Injectable()
export class ItinerariesCommentsService {
  constructor(
    @InjectRepository(ItineraryComment)
    private itinerariesCommentsRepository: Repository<ItineraryComment>,
    private readonly itinerariesService: ItinerariesService,
    private readonly usersService: UsersService,
  ) {}

  async createOne(newCommentDto: CreateItineraryCommentDto) {
    const user = await this.usersService.findOneById(newCommentDto.author_id);

    return this.itinerariesCommentsRepository.save({
      author: user,
      ...newCommentDto,
    });
  }
}
