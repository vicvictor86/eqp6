import { inject, injectable } from 'tsyringe';

import { ICommentsRepository } from '@models/repositories/interfaces/ICommentsRepository';
import { IPostsRepository } from '@models/repositories/interfaces/IPostsRepository';

import { AppError } from '@shared/errors/AppError';

interface Request {
  postId: string;

  limit: number;

  offset: number;
}

@injectable()
export class ShowCommentsService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ postId, limit, offset }: Request) {
    const post = await this.postsRepository.findById(postId);

    if (!post) {
      throw new AppError('Post not found');
    }

    const comments = await this.commentsRepository.findWithPagination(
      postId,
      limit,
      offset,
    );

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
