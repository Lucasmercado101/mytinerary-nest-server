import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateItineraryDto {
  @IsString()
  title: string;

  @IsNumber()
  time: number;

  @IsNumber()
  price: number;

  @IsString({ each: true })
  @ArrayMaxSize(3)
  @ArrayMinSize(1)
  hashtags: string[];

  @IsString({ each: true })
  @ArrayMaxSize(50)
  @ArrayMinSize(1)
  activities: string[];
}
