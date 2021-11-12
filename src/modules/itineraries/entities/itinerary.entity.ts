import { City } from 'src/modules/cities/entities/city.entity';
import { User } from 'src/modules/users/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ItineraryComment } from './comment.entity';

@Entity({ name: 'itinerary' })
export class Itinerary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @ManyToOne(() => User, { nullable: false })
  creator: number;

  @Column({ nullable: false })
  time: number;

  @Column({ nullable: false })
  price: number;

  @Column('text', { nullable: false, array: true })
  hashtags: string[];

  @Column('text', { nullable: false, array: true })
  activities: string[];

  @ManyToOne(() => City, { nullable: false })
  city: number;

  @OneToMany(() => ItineraryComment, (comment) => comment.itinerary, {
    nullable: true,
  })
  comments: ItineraryComment[];
}
