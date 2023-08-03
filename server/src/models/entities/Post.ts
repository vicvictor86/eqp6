import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Photo } from './Photo';
import { User } from './User';
import { Comment } from './Comment';
import { PostEvaluation } from './PostEvaluation';

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

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @OneToMany(() => PostEvaluation, postEvaluation => postEvaluation.post)
  evaluations: PostEvaluation[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
