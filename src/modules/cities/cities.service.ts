import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCityDto } from './dto/update-city.dto';
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

  updateOne(id: number, updateCityDto: UpdateCityDto) {
    return this.usersRepository.update(id, updateCityDto);
  }

  async removeOne(id: number) {
    await this.usersRepository.delete(id);
  }
}
