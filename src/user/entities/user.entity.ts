import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('User') // TypeORM이 Repository Pattern을 지원하기 때문에 Entity와 Repository를 사용할 수 있다.
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40, unique: true })
  mail: string;

  @Column()
  name: string;

  @Column()
  pass: string;

  @Column()
  addr: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
