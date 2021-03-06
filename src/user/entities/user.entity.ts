import { ContentEntity } from 'src/content/entities/content.entity';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('User') // TypeORM이 Repository Pattern을 지원하기 때문에 Entity와 Repository를 사용할 수 있다.
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40, unique: true })
  mail: string;

  @Column()
  name: string;

  @Column({ length: 60 })
  pass: string;

  @Column()
  addr: string;

  @Column()
  access_token: string;

  @Column()
  refresh_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ContentEntity, (c) => c.user)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'user_id',
  })
  content: ContentEntity[];
}
