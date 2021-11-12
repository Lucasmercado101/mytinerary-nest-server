import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  UseGuards,
  Body,
} from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { ItineraryExistsGuard } from 'src/guards/itineraryExists.guard';

@Controller('itinerary')
@UseGuards(ItineraryExistsGuard)
export class ItinerariesController {
  constructor(private readonly itinerariesService: ItinerariesService) {}

  @Get()
  findAll() {
    return this.itinerariesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.itinerariesService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body()
    updateItineraryDto: Omit<Omit<UpdateItineraryDto, 'cityId'>, 'authorId'>,
  ) {
    await this.itinerariesService.updateOne(id, updateItineraryDto);
    return await this.itinerariesService.findOneById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itinerariesService.removeOne(id);
  }
}
