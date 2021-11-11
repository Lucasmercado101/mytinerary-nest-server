import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  user_id!: number;

  @Column({ nullable: false })
  session_id!: string;

  // date with timezone
  @Column({ type: 'timestamptz', nullable: false }) // Recommended
  expiration!: Date;
}
