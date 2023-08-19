import { inject, injectable } from 'tsyringe';

import { ICommentsEvaluationsRepository } from '@models/repositories/interfaces/ICommentsEvaluationRepository';
import { ICommentsRepository } from '@models/repositories/interfaces/ICommentsRepository';

import { CommentEvaluation } from '@models/entities/CommentEvaluation';

import { AppError } from '@shared/errors/AppError';

interface Request {
  commentId: string;

  limit: number;

  offset: number;
}

interface Response {
  commentsEvaluations: CommentEvaluation[];

  totalCommentsEvaluations: number;

  totalPages: number;

  offset: number;
}

@injectable()
export class ShowCommentsEvaluationsByCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('CommentsEvaluationsRepository')
    private commentsEvaluationsRepository: ICommentsEvaluationsRepository,
  ) {}

  public async execute({
    limit,
    offset,
    commentId,
  }: Request): Promise<Response> {
    const commentExists = await this.commentsRepository.findById(commentId);

    if (!commentExists) {
      throw new AppError('Comment not found');
    }

    const allComments =
      await this.commentsEvaluationsRepository.findByCommentId(commentId);

    if (limit === 0) {
      const response = {
        commentsEvaluations: allComments,
        totalCommentsEvaluations: allComments.length,
        totalPages: 1,
        offset: 0,
      } as Response;

      return response;
    }

    const totalCommentsEvaluations = allComments.length;
    const totalPages = Math.ceil(totalCommentsEvaluations / limit);

    const realOffset = offset * limit;

    const commentsEvaluations =
      await this.commentsEvaluationsRepository.findByCommentIdPaginated({
        commentId,
        limit,
        offset: realOffset,
      });

    const response = {
      commentsEvaluations,
      totalCommentsEvaluations,
      totalPages,
      offset,
    } as Response;

    return response;
  }
}
