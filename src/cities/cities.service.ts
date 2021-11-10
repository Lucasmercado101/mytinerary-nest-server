import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private usersRepository: Repository<City>,
  ) {}

  // create(createCityDto: CreateCityDto) {
  //   return 'This action adds a new city';
  // }

  // findAll() {
  //   return `This action returns all cities`;
  // }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  // update(id: number, updateCityDto: UpdateCityDto) {
  //   return `This action updates a #${id} city`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} city`;
  // }
}
