import { ICreatePostDTO } from '@models/dtos/ICreatePostDTO';
import { IShowPostPaginatedDTO } from '@models/dtos/IShowPostPaginatedDTO';

import { Post } from '@models/entities/Post';

export interface IPostsRepository {
  findById(id: string): Promise<Post | null>;
  findByPhotoId(photoId: string): Promise<Post | null>;
  findByUserId(userId: string): Promise<Post[] | null>;
  findByUserIdPaginated(data: IShowPostPaginatedDTO): Promise<Post[] | null>;

  all(): Promise<Post[]>;
  create(data: ICreatePostDTO): Promise<Post>;
  save(post: Post): Promise<Post>;
  delete(postId: string): Promise<void>;
}
