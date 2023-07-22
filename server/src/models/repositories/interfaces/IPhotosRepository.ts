import { ICreatePhotoDTO } from '@models/dtos/ICreatePhotoDTO';
import { Photo } from '@models/entities/Photo';

export interface IPhotosRepository {
  findById(id: string): Promise<Photo | null>;
  findByPath(path: string): Promise<Photo | null>;
  findByUserId(userId: string): Promise<Photo[] | null>;

  all(): Promise<Photo[]>;
  create(data: ICreatePhotoDTO): Promise<Photo>;
  save(user: Photo): Promise<Photo>;
  delete(photo: Photo): Promise<void>;
}
