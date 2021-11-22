import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItineraryCommentsService } from './itinerary-comments.service';
import { CreateItineraryCommentDto } from './dto/create-itinerary-comment.dto';
import { UpdateItineraryCommentDto } from './dto/update-itinerary-comment.dto';

@Controller('itinerary-comments')
export class ItineraryCommentsController {
  constructor(
    private readonly itineraryCommentsService: ItineraryCommentsService,
  ) {}

  @Post()
  create(@Body() createItineraryCommentDto: CreateItineraryCommentDto) {
    return this.itineraryCommentsService.create(createItineraryCommentDto);
  }

  @Get()
  findAll() {
    return this.itineraryCommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itineraryCommentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItineraryCommentDto: UpdateItineraryCommentDto,
  ) {
    return this.itineraryCommentsService.update(+id, updateItineraryCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itineraryCommentsService.remove(+id);
  }
}
