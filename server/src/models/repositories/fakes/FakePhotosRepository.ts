import { v4 } from 'uuid';
import { Photo } from '@models/entities/Photo';

import { ICreatePhotoDTO } from '@models/dtos/ICreatePhotoDTO';
import { IPhotosRepository } from '../interfaces/IPhotosRepository';

export class FakePhotosRepository implements IPhotosRepository {
  private photos: Photo[] = [];

  public async all(): Promise<Photo[]> {
    return this.photos;
  }

  public async findById(id: string): Promise<Photo | null> {
    const findPhoto = this.photos.find(photo => photo.id === id);

    return findPhoto || null;
  }

  public async findByUserId(userId: string): Promise<Photo[] | null> {
    const findPhotos = this.photos.filter(photo => photo.userId === userId);

    if (findPhotos.length === 0) {
      return null;
    }

    return findPhotos || null;
  }

  public async findByPath(path: string): Promise<Photo | null> {
    const findPhoto = this.photos.find(photo => photo.path === path);

    return findPhoto || null;
  }

  public async create(data: ICreatePhotoDTO): Promise<Photo> {
    const photo = new Photo();

    Object.assign(photo, { id: v4() }, data);

    this.photos.push(photo);

    return photo;
  }

  public async save(photo: Photo): Promise<Photo> {
    const findIndex = this.photos.findIndex(
      findPhoto => findPhoto.id === photo.id,
    );

    this.photos[findIndex] = photo;

    return photo;
  }

  public async delete(photoId: string): Promise<void> {
    this.photos = this.photos.filter(photo => photo.id !== photoId);
  }
}
