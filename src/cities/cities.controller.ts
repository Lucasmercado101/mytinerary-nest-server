import { ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IsLoggedInGuard } from 'src/guards/isLoggedIn.guard';
import { CitiesService } from './cities.service';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @UseGuards(IsLoggedInGuard)
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

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCityDto: UpdateCityDto,
  ) {
    await this.citiesService.updateOne(id, updateCityDto);
    return this.citiesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.citiesService.removeOne(id);
  }
}
