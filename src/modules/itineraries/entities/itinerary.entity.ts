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
}
