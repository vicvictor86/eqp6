import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { z } from 'zod';

import { CreatePostService } from '../services/posts/CreatePostService';
import { DeletePostService } from '../services/posts/DeletePostService';
import { ShowPostsService } from '../services/posts/ShowPostsService';

const createPostSchema = z.object({
  userId: z.string().uuid(),
  photoId: z.string(),
  description: z.string().max(1000),
});

const deletePostSchema = z.object({
  userId: z.string().uuid(),
  postId: z.string(),
});

export class PostsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { userId, photoId, description } = createPostSchema.parse({
      userId: request.user.id,
      photoId: request.body.photoId,
      description: request.body.description,
    });

    const createPostService = container.resolve(CreatePostService);

    const post = await createPostService.execute({
      userId,
      photoId,
      description,
    });

    return response.json(instanceToInstance(post));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showPostsService = container.resolve(ShowPostsService);

    const posts = await showPostsService.execute(userId);

    return response.json(posts);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { userId, postId } = deletePostSchema.parse({
      userId: request.user.id,
      postId: request.query.postId,
    });

    const deletePostService = container.resolve(DeletePostService);

    const post = await deletePostService.execute({
      userId,
      postId,
    });

    return response.json(instanceToInstance(post));
  }
}
