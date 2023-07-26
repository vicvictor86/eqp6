import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Photo } from './Photo';
import { Post } from './Post';

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

  @Column({ name: 'avatar', type: 'varchar' })
  avatar: string | undefined;

  @Column()
  bio: string;

  @Column()
  confirmed: boolean;

  @Column({ name: 'is_admin' })
  isAdmin: boolean;

  @OneToMany(() => Photo, photo => photo.user)
  photos: Photo[];

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
