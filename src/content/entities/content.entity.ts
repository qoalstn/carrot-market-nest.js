import { UserEntity } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Content')
export class ContentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // UserEntity의 PK를 자동으로 foreign key로 생성한다.(userId)
  // @ManyToOne(() => UserEntity, (u) => u.content)
  // user: UserEntity;

  //기존 컬럼을 외래키로 지정하고 싶을 경우
  @ManyToOne(() => UserEntity, (u) => u.content)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;
}
