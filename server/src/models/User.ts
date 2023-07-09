import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'real_name' })
  realName: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ name: 'avatar' })
  avatar: string;

  @Column()
  bio: string;

  @Column({ name: 'is_admin' })
  isAdmin: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
