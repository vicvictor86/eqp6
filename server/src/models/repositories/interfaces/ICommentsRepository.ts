import { ICreateCommentDTO } from '@models/dtos/ICreateCommentDTO';
import { Comment } from '@models/entities/Comment';

export interface ICommentsRepository {
  findById(id: string): Promise<Comment | null>;
  findByPostId(postId: string): Promise<Comment[] | null>;
  findByUserId(userId: string): Promise<Comment[] | null>;

  all(): Promise<Comment[]>;
  create(data: ICreateCommentDTO): Promise<Comment>;
  save(comment: Comment): Promise<Comment>;
  delete(commentId: string): Promise<void>;
}
