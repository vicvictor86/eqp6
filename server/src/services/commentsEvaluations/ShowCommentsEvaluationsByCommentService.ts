import { inject, injectable } from 'tsyringe';

import { ICommentsEvaluationsRepository } from '@models/repositories/interfaces/ICommentsEvaluationRepository';
import { CommentEvaluation } from '@models/entities/CommentEvaluation';

import { AppError } from '@shared/errors/AppError';

@injectable()
export class ShowCommentsEvaluationsByCommentService {
  constructor(
    @inject('CommentsEvaluationsRepository')
    private commentsEvaluationsRepository: ICommentsEvaluationsRepository,
  ) {}

  public async execute(commentId: string): Promise<CommentEvaluation[]> {
    const commentsEvaluations =
      await this.commentsEvaluationsRepository.findByCommentId(commentId);

    if (!commentsEvaluations) {
      throw new AppError('No commentsEvaluations found in this comment.');
    }

    return commentsEvaluations;
  }
}
