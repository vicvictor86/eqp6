import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IPostsRepository } from '@models/repositories/interfaces/IPostsRepository';
import { Post } from '@models/entities/Post';
import { IUsersRepository } from '@models/repositories/interfaces/IUserRepository';

interface Request {
  userId: string;

  limit: number;

  offset: number;
}

interface Response {
  posts: Post[];

  totalPosts: number;

  totalPages: number;

  offset: number;
}

@injectable()
export class ShowPostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, limit, offset }: Request): Promise<Response> {
    const defaultResponse = {
      posts: [],
      totalPosts: 0,
      totalPages: 1,
      offset: 0,
    } as Response;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found');
    }

    const allPosts = await this.postsRepository.findByUserId(userId);

    if (!allPosts) {
      return defaultResponse;
    }

    const totalPosts = allPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);

    const realOffset = offset * limit;

    const posts = await this.postsRepository.findByUserIdPaginated({
      userId,
      limit,
      offset: realOffset,
    });

    if (!posts) {
      return defaultResponse;
    }

    const response = {
      posts,
      totalPosts,
      totalPages,
      offset,
    } as Response;

    return response;
  }
}
