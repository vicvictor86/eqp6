import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IPostsRepository } from '@models/repositories/interfaces/IPostsRepository';
import { Post } from '@models/entities/Post';

@injectable()
export class ShowPostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(userId: string): Promise<Post[]> {
    const posts = await this.postsRepository.findByUserId(userId);

    if (!posts) {
      throw new AppError('No posts found for this user.');
    }

    return posts;
  }
}
