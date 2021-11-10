import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private usersRepository: Repository<City>,
  ) {}

  createOne(createCityDto: City) {
    return this.usersRepository.save(createCityDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

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
