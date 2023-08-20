import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { ICommentsRepository } from '@models/repositories/interfaces/ICommentsRepository';
import { Comment } from '@models/entities/Comment';
import { IPostsRepository } from '@models/repositories/interfaces/IPostsRepository';

@injectable()
export class ShowCommentsService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(postId: string, limit = 10, offset = 0) {
    const post = await this.postsRepository.findById(postId);

    if (!post) {
      throw new AppError('Post not found');
    }
    const comments = await this.commentsRepository.findWithPagination(
      postId,
      limit,
      offset,
    );
    if (!comments) {
      throw new AppError('No comments found for this user.');
    }
    const totalComments = await this.commentsRepository.countByPostId(postId);

    const totalPages = Math.ceil(totalComments / limit);

    return {
      comments,
      totalComments,
      totalPages,
      offset,
    };
  }
}
