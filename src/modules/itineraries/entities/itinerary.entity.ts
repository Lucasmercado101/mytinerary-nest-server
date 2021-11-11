import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'itinerary' })
export class Itinerary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  creator: string;

  @Column({ nullable: false })
  time: number;

  @Column({ nullable: false })
  country: string;

  @Column('text', { nullable: false, array: true })
  hashtags: [string?, string?, string?];

  @Column('text', { nullable: false, array: true })
  activities: string[];

  @Column({ nullable: false })
  city_id: number;
}
