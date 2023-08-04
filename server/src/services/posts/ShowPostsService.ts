import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IPostsRepository } from '@models/repositories/interfaces/IPostsRepository';
import { Post } from '@models/entities/Post';
import { IUsersRepository } from '@models/repositories/interfaces/IUserRepository';

@injectable()
export class ShowPostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(userId: string): Promise<Post[]> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found');
    }

    const posts = await this.postsRepository.findByUserId(userId);

    if (!posts) {
      return [];
    }

    return posts;
  }
}
