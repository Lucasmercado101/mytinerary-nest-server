import { City } from 'src/modules/cities/entities/city.entity';
import { User } from 'src/modules/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'itinerary' })
export class Itinerary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @ManyToOne(() => User, { nullable: false })
  creator: string;

  @Column({ nullable: false })
  time: number;

  @Column({ nullable: false })
  price: number;

  @Column('text', { nullable: false, array: true })
  hashtags: [string?, string?, string?];

  @Column('text', { nullable: false, array: true })
  activities: string[];

  @ManyToOne(() => City, { nullable: false })
  city: number;
}