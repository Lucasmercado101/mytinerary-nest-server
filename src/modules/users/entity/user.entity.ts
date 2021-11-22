import { ItineraryComment } from 'src/modules/itinerary-comments/entities/itinerary-comment.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: true })
  profile_pic?: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => ItineraryComment, (comment) => comment.author)
  itineraryComments: ItineraryComment[];
}
