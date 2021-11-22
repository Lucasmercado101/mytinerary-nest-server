import { PartialType } from '@nestjs/mapped-types';
import { CreateItineraryCommentDto } from './create-itinerary-comment.dto';

export class UpdateItineraryCommentDto extends PartialType(CreateItineraryCommentDto) {}
