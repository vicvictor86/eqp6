import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Photo } from './Photo';
import { User } from './User';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, user => user.posts, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'photo_id' })
  photoId: string;

  @ManyToOne(() => Photo, photo => photo.posts, { eager: true })
  @JoinColumn({ name: 'photo_id' })
  photo: Photo;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
