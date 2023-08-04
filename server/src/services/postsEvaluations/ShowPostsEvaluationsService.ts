import { inject, injectable } from 'tsyringe';

import { IPostsEvaluationsRepository } from '@models/repositories/interfaces/IPostsEvaluationRepository';
import { PostEvaluation } from '@models/entities/PostEvaluation';

import { AppError } from '@shared/errors/AppError';

@injectable()
export class ShowPostsEvaluationsService {
  constructor(
    @inject('PostsEvaluationsRepository')
    private postsEvaluationsRepository: IPostsEvaluationsRepository,
  ) {}

  public async execute(): Promise<PostEvaluation[]> {
    const postsEvaluations = await this.postsEvaluationsRepository.all();

    if (!postsEvaluations) {
      throw new AppError('No postsEvaluations found for this user.');
    }

    return postsEvaluations;
  }
}
