import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  UseGuards,
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

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateItineraryDto: UpdateItineraryDto,
  // ) {
  //   return this.itinerariesService.update(+id, updateItineraryDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itinerariesService.removeOne(id);
  }
}
