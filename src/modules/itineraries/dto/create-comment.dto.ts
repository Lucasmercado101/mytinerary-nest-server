import { IsNumber, IsString } from 'class-validator';
import { Itinerary } from '../entities/itinerary.entity';

export class CreateItineraryCommentDto {
  @IsNumber()
  author_id: number;

  @IsString()
  comment: string;

  itinerary: Itinerary;
}
