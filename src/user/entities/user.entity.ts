import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity() // TypeORM이 Repository Pattern을 지원하기 때문에 Entity와 Repository를 사용할 수 있다.
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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
