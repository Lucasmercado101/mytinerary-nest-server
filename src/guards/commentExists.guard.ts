import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { ItineraryCommentsService } from 'src/modules/itinerary-comments/itinerary-comments.service';

@Injectable()
export class ItineraryCommentExistsGuard implements CanActivate {
  constructor(
    @Inject(ItineraryCommentsService)
    private readonly itineraryCommentsService: ItineraryCommentsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const id = request.params.id;

    if (await this.itineraryCommentsService.exists(+id)) return true;

    throw new NotFoundException(`Itinerary with id ${id} not found`);
  }
}
