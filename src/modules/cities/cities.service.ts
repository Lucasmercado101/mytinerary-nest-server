import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private citiiesRepository: Repository<City>,
  ) {}

  createOne(createCityDto: City) {
    return this.citiiesRepository.save(createCityDto);
  }

  findAll() {
    return this.citiiesRepository.find();
  }

  async findOne(id: number) {
    const city = await this.citiiesRepository.findOne(id);

    if (!city) {
      throw new NotFoundException(`City with ID "${id}" not found`);
    }

    const itineraries = await this.citiiesRepository.query(
      `
      SELECT id,
		title,
		time,
		price,
		activities,
		hashtags,
		user_id as "userId",
		"cityId",
    user_id as "creatorId",
    profile_pic as "profilePic",
    username as "creatorUsername"
	FROM itinerary
		INNER JOIN (
			SELECT id as user_id,
				profile_pic,
        username
			FROM users
		) AS users ON itinerary."creatorId" = users.user_id
	WHERE itinerary."cityId" = $1
      `,
      [id],
    );

    const comments = await this.citiiesRepository.query(
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
		WHERE itinerary_comments."itineraryId" = ANY($1::int[])
`,
      [itineraries.map((el) => el.id)],
    );

    const itinerariesResp = itineraries.map((itinerary) => {
      const itineraryComments = comments
        .filter((comment) => comment.itineraryId === itinerary.id)
        .map((el) => {
          const author = {
            id: el.authorId,
            profilePic: el.profile_pic,
            username: el.username,
          };
          const comment = { ...el, author };

          delete comment.authorId;
          delete comment.profile_pic;
          delete comment.username;
          delete comment.itineraryId;

          return comment;
        });

      delete itinerary.userId;
      delete itinerary.cityId;

      itinerary.creator = {
        id: itinerary.creatorId,
        profilePic: itinerary.profilePic,
        username: itinerary.creatorUsername,
      };

      delete itinerary.creatorId;
      delete itinerary.profilePic;
      delete itinerary.creatorUsername;

      return { ...itinerary, comments: itineraryComments };
    });

    city.itineraries = itinerariesResp;
    return city;
  }

  updateOne(id: number, updateCityDto: UpdateCityDto) {
    return this.citiiesRepository.update(id, updateCityDto);
  }

  // helper fn
  public cityExists(id: number) {
    return this.citiiesRepository.findOne(id).then((city) => !!city);
  }

  async removeOne(id: number) {
    await this.citiiesRepository.delete(id);
  }
}
