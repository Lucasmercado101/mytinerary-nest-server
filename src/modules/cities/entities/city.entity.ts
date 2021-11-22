import { IsString } from 'class-validator';
import { Itinerary } from 'src/modules/itineraries/entities/itinerary.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'city' })
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsString()
  name: string;

  @Column({ nullable: false })
  @IsString()
  country: string;

  @OneToMany((type) => Itinerary, (itinerary) => itinerary.city, {
    nullable: true,
  })
  itineraries: Itinerary[];
}
