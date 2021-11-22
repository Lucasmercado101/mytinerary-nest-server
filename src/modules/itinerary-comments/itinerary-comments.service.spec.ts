import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryCommentsService } from './itinerary-comments.service';

describe('ItineraryCommentsService', () => {
  let service: ItineraryCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItineraryCommentsService],
    }).compile();

    service = module.get<ItineraryCommentsService>(ItineraryCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
