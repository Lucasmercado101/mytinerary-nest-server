import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  UseGuards,
  Body,
  Post,
  forwardRef,
  Inject,
  HttpCode,
} from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { ItineraryExistsGuard } from 'src/guards/itineraryExists.guard';
import { PlainBody } from 'src/decorators/plainBody.decorator';
import { ItineraryCommentsService } from '../itinerary-comments/itinerary-comments.service';
import { IsLoggedInGuard } from 'src/guards/isLoggedIn.guard';
import { User } from 'src/decorators/user.decorator';
import { User as UserEntity } from '../users/entity/user.entity';

@Controller('itinerary')
@UseGuards(ItineraryExistsGuard)
export class ItinerariesController {
  constructor(
    @Inject(forwardRef(() => ItineraryCommentsService))
    private readonly itineraryCommentsService: ItineraryCommentsService,
    private readonly itinerariesService: ItinerariesService,
  ) {}

  @Get()
  findAll() {
    return this.itinerariesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.itinerariesService.findOneById(id);
  }

  @UseGuards(IsLoggedInGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body()
    updateItineraryDto: UpdateItineraryDto,
  ) {
    await this.itinerariesService.updateOne(id, updateItineraryDto);
    return await this.itinerariesService.findOneById(id);
  }

  @Delete(':id')
  @UseGuards(IsLoggedInGuard)
  @HttpCode(201)
  remove(@Param('id') id: number) {
    return this.itinerariesService.removeOne(id);
  }

  // -------------- Comments -----------------

  @Post(':id/comment')
  @UseGuards(IsLoggedInGuard)
  async addComment(
    @Param('id') id: number,
    @User() user: Omit<UserEntity, 'password'>,
    @PlainBody() comment: string,
  ) {
    return await this.itineraryCommentsService.createOne({
      author_id: user.id,
      comment,
      itinerary: await this.itinerariesService.findOneById(id),
    });
  }
}
