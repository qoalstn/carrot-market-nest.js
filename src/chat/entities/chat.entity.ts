import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Chat')
export class ChatEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  user_type: string;

  @Column()
  user_name: string;

  @Column()
  room_id: string;

  @Column()
  profile: string;

  @CreateDateColumn()
  created_at: Date;
}
