import { inject, injectable } from 'tsyringe';

import { IPostsEvaluationsRepository } from '@models/repositories/interfaces/IPostsEvaluationRepository';

import { AppError } from '@shared/errors/AppError';
import { PostEvaluation } from '@models/entities/PostEvaluation';

@injectable()
export class ShowPostsEvaluationsByCommentService {
  constructor(
    @inject('PostsEvaluationsRepository')
    private postsEvaluationsRepository: IPostsEvaluationsRepository,
  ) {}

  public async execute(postId: string): Promise<PostEvaluation[]> {
    const postsEvaluations = await this.postsEvaluationsRepository.findByPostId(
      postId,
    );

    if (!postsEvaluations) {
      throw new AppError('No evaluation found in this post.');
    }

    return postsEvaluations;
  }
}
