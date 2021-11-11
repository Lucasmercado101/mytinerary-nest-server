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
  findOne(@Param('id') id: number) {
    return this.citiesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCityDto: UpdateCityDto) {
    await this.citiesService.updateOne(id, updateCityDto);
    return this.citiesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.citiesService.removeOne(id);
  }
}
