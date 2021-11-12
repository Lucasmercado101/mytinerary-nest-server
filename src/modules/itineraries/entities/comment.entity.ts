import { User } from 'src/modules/users/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Itinerary } from './itinerary.entity';

@Entity({ name: 'itinerary_comments' })
export class ItineraryComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.itineraryComments)
  author: User;

  @Column({ nullable: false })
  comment: string;

  @ManyToOne(() => Itinerary, (itinerary) => itinerary.comments)
  itinerary: Itinerary;
}
