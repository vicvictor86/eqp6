import { inject, injectable } from 'tsyringe';

import { ICommentsEvaluationsRepository } from '@models/repositories/interfaces/ICommentsEvaluationRepository';
import { CommentEvaluation } from '@models/entities/CommentEvaluation';

import { AppError } from '@shared/errors/AppError';

@injectable()
export class ShowCommentsEvaluationsService {
  constructor(
    @inject('CommentsEvaluationsRepository')
    private commentsEvaluationsRepository: ICommentsEvaluationsRepository,
  ) {}

  public async execute(): Promise<CommentEvaluation[]> {
    const commentsEvaluations = await this.commentsEvaluationsRepository.all();

    if (!commentsEvaluations) {
      throw new AppError('No commentsEvaluations found for this user.');
    }

    return commentsEvaluations;
  }
}
