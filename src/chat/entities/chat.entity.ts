import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Chat')
export class ChatEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  chat_id: number;

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

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;
}

@Entity('Room')
export class ChatRoomEntity extends BaseEntity {
  @PrimaryColumn()
  room_id: string;

  @Column()
  user_id: string;

  @Column()
  product_id: string;

  @Column()
  user_profile: string;

  @Column()
  product_profile: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
