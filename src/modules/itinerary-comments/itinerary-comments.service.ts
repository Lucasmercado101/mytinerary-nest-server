import { Injectable } from '@nestjs/common';
import { CreateItineraryCommentDto } from './dto/create-itinerary-comment.dto';
import { UpdateItineraryCommentDto } from './dto/update-itinerary-comment.dto';

@Injectable()
export class ItineraryCommentsService {
  create(createItineraryCommentDto: CreateItineraryCommentDto) {
    return 'This action adds a new itineraryComment';
  }

  findAll() {
    return `This action returns all itineraryComments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itineraryComment`;
  }

  update(id: number, updateItineraryCommentDto: UpdateItineraryCommentDto) {
    return `This action updates a #${id} itineraryComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} itineraryComment`;
  }
}
