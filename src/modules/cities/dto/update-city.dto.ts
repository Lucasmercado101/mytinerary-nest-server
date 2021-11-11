import { PartialType } from '@nestjs/mapped-types';
import { City } from '../entities/city.entity';

export class UpdateCityDto extends PartialType(City) {}
