import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { ItinerariesService } from 'src/modules/itineraries/itineraries.service';

@Injectable()
export class ItineraryExistsGuard implements CanActivate {
  constructor(
    @Inject(ItinerariesService)
    private readonly itinerariesService: ItinerariesService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const id = request.params.id;

    if (await this.itinerariesService.itineraryExists(+id)) return true;

    throw new NotFoundException(`Itinerary with id ${id} not found`);
  }
}
