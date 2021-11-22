import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryCommentsController } from './itinerary-comments.controller';
import { ItineraryCommentsService } from './itinerary-comments.service';

describe('ItineraryCommentsController', () => {
  let controller: ItineraryCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItineraryCommentsController],
      providers: [ItineraryCommentsService],
    }).compile();

    controller = module.get<ItineraryCommentsController>(ItineraryCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
