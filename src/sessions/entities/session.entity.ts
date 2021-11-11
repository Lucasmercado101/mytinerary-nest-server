import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  user_id!: number;

  @Column({ nullable: false })
  session_id!: string;

  // date with timezone
  @CreateDateColumn({ nullable: false })
  expiration!: Date;
}
