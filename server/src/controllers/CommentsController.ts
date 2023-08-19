import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { z } from 'zod';

import { CreateCommentService } from '../services/comments/CreateCommentService';
import { DeleteCommentService } from '../services/comments/DeleteCommentService';
import { ShowCommentsService } from '../services/comments/ShowCommentsService';
import { DeleteCommentsByPostService } from '../services/comments/DeleteCommentsByPostService';

const createCommentSchema = z.object({
  text: z.string().max(1000),
  userId: z.string().uuid(),
  postId: z.string().uuid(),
});

const deletePhotoSchema = z.object({
  userId: z.string().uuid(),
  commentId: z.string().uuid(),
  postId: z.string().uuid(),
});

const deletePhotoByPostSchema = z.object({
  userId: z.string().uuid(),
  postId: z.string().uuid(),
});

export class CommentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { text, userId, postId } = createCommentSchema.parse({
      text: request.body.text,
      userId: request.user.id,
      postId: request.body.postId,
    });

    const createCommentService = container.resolve(CreateCommentService);

    const comment = await createCommentService.execute({
      text,
      userId,
      postId,
    });

    return response.json(instanceToInstance(comment));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { postId } = request.body;

    const showCommentsService = container.resolve(ShowCommentsService);

    const comments = await showCommentsService.execute(postId);

    return response.json(instanceToInstance(comments));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { userId, commentId, postId } = deletePhotoSchema.parse({
      userId: request.user.id,
      commentId: request.query.commentId,
      postId: request.query.postId,
    });

    const deleteCommentService = container.resolve(DeleteCommentService);

    const comment = await deleteCommentService.execute({
      userId,
      commentId,
      postId,
    });

    return response.json(instanceToInstance(comment));
  }

  public async deleteByPost(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { userId, postId } = deletePhotoByPostSchema.parse({
      userId: request.user.id,
      postId: request.query.postId,
    });

    const deleteCommentsByPostService = container.resolve(
      DeleteCommentsByPostService,
    );

    const comments = await deleteCommentsByPostService.execute({
      userId,
      postId,
    });

    return response.json(instanceToInstance(comments));
  }
}
