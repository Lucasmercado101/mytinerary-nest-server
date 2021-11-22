import { Delete, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { CityExistsGuard } from 'src/guards/cityExists.guard';
import { IsLoggedInGuard } from 'src/guards/isLoggedIn.guard';
import { CreateItineraryDto } from '../itineraries/dto/create-itinerary.dto';
import { UpdateItineraryDto } from '../itineraries/dto/update-itinerary.dto';
import { ItinerariesService } from '../itineraries/itineraries.service';
import { User as UserEntity } from '../users/entity/user.entity';

@Controller('cities/:id/itinerary')
@UseGuards(CityExistsGuard)
export class CityItinerariesController {
  constructor(private readonly itinerariesService: ItinerariesService) {}

  @Post()
  @UseGuards(IsLoggedInGuard)
  async create(
    @Body()
    createItineraryDto: Omit<Omit<CreateItineraryDto, 'authorId'>, 'cityId'>,
    @User() user: Omit<UserEntity, 'password'>,
    @Param('id', ParseIntPipe) cityId: number,
  ) {
    return this.itinerariesService.createOne({
      activities: createItineraryDto.activities,
      city: cityId,
      creator: user.id,
      hashtags: createItineraryDto.tags,
      price: createItineraryDto.price,
      title: createItineraryDto.title,
      time: createItineraryDto.duration,
      comments: null,
    });
  }
}
