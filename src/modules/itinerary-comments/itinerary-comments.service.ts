import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateItineraryCommentDto } from './dto/create-itinerary-comment.dto';
import { ItineraryComment } from './entities/itinerary-comment.entity';

@Injectable()
export class ItineraryCommentsService {
  constructor(
    @InjectRepository(ItineraryComment)
    private itinerariesCommentsRepository: Repository<ItineraryComment>,
    private readonly usersService: UsersService,
  ) {}

  async createOne(newCommentDto: CreateItineraryCommentDto) {
    const user = await this.usersService.findOneById(newCommentDto.author_id);

    if (!user) throw new InternalServerErrorException();

    this.itinerariesCommentsRepository.save({
      author: user,
      ...newCommentDto,
    });
  }

  async deleteOne(id: number) {
    return this.itinerariesCommentsRepository.delete(id);
  }
}
