import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateItineraryCommentDto } from './dto/create-comment.dto';
import { ItineraryComment } from './entities/comment.entity';
import { match } from 'fp-ts/Either';
import { User } from '../users/entity/user.entity';

@Injectable()
export class ItinerariesCommentsService {
  constructor(
    @InjectRepository(ItineraryComment)
    private itinerariesCommentsRepository: Repository<ItineraryComment>,
    private readonly usersService: UsersService,
  ) {}

  async createOne(newCommentDto: CreateItineraryCommentDto) {
    const user = await this.usersService.findOneById(newCommentDto.author_id);
    return match(
      () => {
        throw new InternalServerErrorException();
      },
      (userData: Omit<User, 'password'>) =>
        this.itinerariesCommentsRepository.save({
          author: userData,
          ...newCommentDto,
        }),
    )(user);
  }

  async deleteOne(id: number) {
    return this.itinerariesCommentsRepository.delete(id);
  }
}
