import { inject, injectable } from 'tsyringe';

import { Post } from '@models/entities/Post';
import { IPostsRepository } from '@models/repositories/interfaces/IPostsRepository';

interface Request {
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
  ) {}

  public async execute({ limit, offset }: Request): Promise<Response> {
    const allPosts = await this.postsRepository.all();

    const totalPosts = allPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);

    const realOffset = offset * limit;

    const posts = await this.postsRepository.allPaginated({
      limit,
      offset: realOffset,
    });

    const response = {
      posts,
      totalPosts,
      totalPages,
      offset,
    } as Response;

    return response;
  }
}
