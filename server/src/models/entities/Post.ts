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

import { Expose } from 'class-transformer';
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

  @Column({ name: 'filter_used' })
  filterUsed: string;

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

  @OneToMany(() => Comment, comment => comment.post, { eager: true })
  comments: Comment[];

  @OneToMany(() => PostEvaluation, postEvaluation => postEvaluation.post, {
    eager: true,
  })
  evaluations: PostEvaluation[];

  @Expose({ name: 'likes' })
  getLikes(): number | null {
    if (!this.evaluations) {
      return null;
    }

    return this.evaluations.filter(evaluation => evaluation.isLike).length;
  }

  @Expose({ name: 'dislikes' })
  getDislikes(): number | null {
    if (!this.evaluations) {
      return null;
    }

    return this.evaluations.filter(evaluation => !evaluation.isLike).length;
  }

  @Expose({ name: 'userEvaluation' })
  getUserEvaluation(): boolean | null {
    if (!this.evaluations) {
      return null;
    }

    const userEvaluation = this.evaluations.find(
      evaluation => evaluation.userId === this.userId,
    );

    if (!userEvaluation) {
      return null;
    }

    return userEvaluation.isLike;
  }

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
