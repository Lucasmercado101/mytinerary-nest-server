import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateItineraryDto {
  @IsString()
  title: string;

  @IsNumber()
  authorId: number;

  @IsNumber()
  duration: number;

  @IsNumber()
  price: number;

  @IsString({ each: true })
  @ArrayMaxSize(3)
  @ArrayMinSize(1)
  tags: string[];

  @IsString({ each: true })
  @ArrayMaxSize(50)
  @ArrayMinSize(1)
  activities: string[];

  @IsNumber()
  cityId: number;
}
