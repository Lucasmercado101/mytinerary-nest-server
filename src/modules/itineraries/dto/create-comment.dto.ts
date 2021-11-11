import { IsNumber, IsString } from 'class-validator';

export class CreateItineraryCommentDto {
  @IsNumber()
  author_id: number;

  @IsString()
  comment: string;
}
