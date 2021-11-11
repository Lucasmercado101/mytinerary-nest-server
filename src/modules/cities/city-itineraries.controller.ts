import {
  NotFoundException,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { IsLoggedInGuard } from 'src/guards/isLoggedIn.guard';
import { CreateItineraryDto } from '../itineraries/dto/create-itinerary.dto';
import { ItinerariesService } from '../itineraries/itineraries.service';
import { User as UserEntity } from '../users/entity/user.entity';
import { CitiesService } from './cities.service';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';

@Controller('cities/:id/itinerary')
export class CityItinerariesController {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly itinerariesService: ItinerariesService,
  ) {}

  @Post()
  @UseGuards(IsLoggedInGuard)
  async create(
    @Body()
    createItineraryDto: Omit<Omit<CreateItineraryDto, 'authorId'>, 'cityId'>,
    @User() user: Omit<UserEntity, 'password'>,
    @Param('id', ParseIntPipe) cityId: number,
  ) {
    const city = await this.citiesService.findOne(cityId);
    if (!city) {
      throw new NotFoundException(`City with id ${cityId} not found`);
    }

    return this.itinerariesService.createOne({
      activities: createItineraryDto.activities,
      city: cityId,
      creator: user.id,
      hashtags: createItineraryDto.tags,
      price: createItineraryDto.price,
      title: createItineraryDto.title,
      time: createItineraryDto.duration,
    });
  }

  //   @Get()
  //   findAll() {
  //     return this.citiesService.findAll();
  //   }

  //   @Get(':id')
  //   findOne(@Param('id', ParseIntPipe) id: number) {
  //     return this.citiesService.findOne(id);
  //   }

  //   @Patch(':id')
  //   async update(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Body() updateCityDto: UpdateCityDto,
  //   ) {
  //     await this.citiesService.updateOne(id, updateCityDto);
  //     return this.citiesService.findOne(id);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id', ParseIntPipe) id: number) {
  //     return this.citiesService.removeOne(id);
  //   }
}
