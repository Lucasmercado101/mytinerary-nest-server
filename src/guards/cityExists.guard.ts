import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { CitiesService } from 'src/modules/cities/cities.service';

@Injectable()
export class CityExistsGuard implements CanActivate {
  constructor(
    @Inject(CitiesService)
    private readonly citiesService: CitiesService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const id = request.params.id;

    if (await this.citiesService.cityExists(+id)) return true;

    throw new NotFoundException(`City with id ${id} not found`);
  }
}
