import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { Itinerary } from './entities/itinerary.entity';

@Injectable()
export class ItinerariesService {
  constructor(
    @InjectRepository(Itinerary)
    private itinerariesRepository: Repository<Itinerary>,
  ) {}

  public createOne(createItineraryDto: Omit<Itinerary, 'id'>) {
    return this.itinerariesRepository.save(createItineraryDto);
  }

  public async findOneById(id: number) {
    const itinerary = await this.itinerariesRepository.findOne(id);
    const resp = await this.itinerariesRepository.query(
      `
    SELECT id,
			"authorId",
			comment,
			"itineraryId",
			profile_pic,
      username
		FROM itinerary_comments
			INNER JOIN (
				SELECT id as "userId",
					profile_pic,
          username
				FROM users
			) AS users ON users."userId" = itinerary_comments."authorId"
		WHERE itinerary_comments."itineraryId" = $1
`,
      [id],
    );

    const comments = resp.map((el) => ({
      id: el.id,
      comment: el.comment,
      author: {
        id: el.authorId,
        username: el.username,
        profilePic: el.profile_pic ?? null,
      },
    }));
    itinerary.comments = comments;
    return itinerary;
  }

  public removeOne(id: number) {
    return this.itinerariesRepository.delete(id);
  }

  public updateOne(id: number, updateItineraryDto: UpdateItineraryDto) {
    return this.itinerariesRepository.update(id, updateItineraryDto);
  }

  public findAll() {
    return this.itinerariesRepository.find({
      relations: ['comments'],
    });
  }

  public itineraryExists(id: number): Promise<boolean> {
    return this.itinerariesRepository
      .findOne(id)
      .then((itinerary) => !!itinerary);
  }
}
