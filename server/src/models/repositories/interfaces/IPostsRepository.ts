import { ICreatePostDTO } from '@models/dtos/ICreatePostDTO';
import { IShowByUserPaginatedDTO } from '@models/dtos/IShowByUserPaginatedDTO';

import { Post } from '@models/entities/Post';

export interface IPostsRepository {
  findById(id: string): Promise<Post | null>;
  findByPhotoId(photoId: string): Promise<Post | null>;
  findByUserId(userId: string): Promise<Post[] | null>;
  findByUserIdPaginated(data: IShowByUserPaginatedDTO): Promise<Post[] | null>;

  all(): Promise<Post[]>;
  create(data: ICreatePostDTO): Promise<Post>;
  save(post: Post): Promise<Post>;
  delete(postId: string): Promise<void>;
}
