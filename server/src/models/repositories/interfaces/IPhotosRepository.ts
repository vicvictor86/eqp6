import { ICreatePhotoDTO } from '@models/dtos/ICreatePhotoDTO';
import { IShowByUserPaginatedDTO } from '@models/dtos/IShowByUserPaginatedDTO';
import { Photo } from '@models/entities/Photo';

export interface IPhotosRepository {
  findById(id: string): Promise<Photo | null>;
  findByPath(path: string): Promise<Photo | null>;
  findByUserId(userId: string): Promise<Photo[] | null>;
  findByUserIdPaginated(data: IShowByUserPaginatedDTO): Promise<Photo[] | null>;

  all(): Promise<Photo[]>;
  create(data: ICreatePhotoDTO): Promise<Photo>;
  save(photo: Photo): Promise<Photo>;
  delete(photoId: string): Promise<void>;
}
