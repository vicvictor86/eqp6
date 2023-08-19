import { inject, injectable } from 'tsyringe';

import { ICommentsEvaluationsRepository } from '@models/repositories/interfaces/ICommentsEvaluationRepository';
import { CommentEvaluation } from '@models/entities/CommentEvaluation';

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
    @inject('CommentsEvaluationsRepository')
    private commentsEvaluationsRepository: ICommentsEvaluationsRepository,
  ) {}

  public async execute({
    limit,
    offset,
    commentId,
  }: Request): Promise<Response> {
    const allComments =
      await this.commentsEvaluationsRepository.findByCommentId(commentId);

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
