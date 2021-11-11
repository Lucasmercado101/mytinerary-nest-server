import { City } from 'src/modules/cities/entities/city.entity';
import { User } from 'src/modules/users/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'itinerary_comments' })
export class ItineraryComment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ nullable: false })
  comment: string;
}
