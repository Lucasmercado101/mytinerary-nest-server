import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'city' })
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  country: string;
}
