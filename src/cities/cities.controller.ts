import { ParseIntPipe } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  create(@Body() createCityDto: City) {
    return this.citiesService.createOne(createCityDto);
  }

  @Get()
  findAll() {
    return this.citiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.citiesService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
  //   return this.citiesService.update(+id, updateCityDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.citiesService.remove(+id);
  // }
}
