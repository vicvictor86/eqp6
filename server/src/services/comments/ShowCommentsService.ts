import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { ICommentsRepository } from '@models/repositories/interfaces/ICommentsRepository';
import { Comment } from '@models/entities/Comment';

@injectable()
export class ShowCommentsService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute(postId: string): Promise<Comment[]> {
    const comments = await this.commentsRepository.findByPostId(postId);

    if (!comments) {
      throw new AppError('No comments found for this user.');
    }

    return comments;
  }
}
