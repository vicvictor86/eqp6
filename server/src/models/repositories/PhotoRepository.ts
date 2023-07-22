import { connectionSource } from '@models/database/dataSource';
import { ICreatePhotoDTO } from '@models/dtos/ICreatePhotoDTO';

import { Photo } from '@models/entities/Photo';
import { IPhotosRepository } from './interfaces/IPhotosRepository';

const photosRepository = connectionSource.getRepository(Photo);

export const PhotosRepository: IPhotosRepository = photosRepository.extend({
  async findById(id: string): Promise<Photo | null> {
    const photo = await photosRepository.findOne({
      where: {
        id,
      },
    });
    return photo;
  },

  async findByPath(path: string): Promise<Photo | null> {
    const photo = await photosRepository.findOne({
      where: {
        path,
      },
    });
    return photo;
  },

  async findByUserId(userId: string): Promise<Photo[] | null> {
    const photo = await photosRepository.find({
      where: {
        userId,
      },
    });
    return photo;
  },

  async create(photoData: ICreatePhotoDTO): Promise<Photo> {
    const photo = photosRepository.create(photoData);

    await photosRepository.save(photo);

    return photo;
  },

  async save(photo: Photo): Promise<Photo> {
    return photosRepository.save(photo);
  },

  async all(): Promise<Photo[]> {
    return photosRepository.find();
  },
  async delete(photo: Photo): Promise<void> {
    photosRepository.delete(photo);
  },
});
