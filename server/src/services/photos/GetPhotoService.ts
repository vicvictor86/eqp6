import { inject, injectable } from 'tsyringe';

import { Photo } from '@models/entities/Photo';

import { IPhotosRepository } from '@models/repositories/interfaces/IPhotosRepository';

import { AppError } from '@shared/errors/AppError';

interface Request {
  photoId: string;
}

@injectable()
export class GetPhotoService {
  constructor(
    @inject('PhotosRepository')
    private photosRepository: IPhotosRepository,
  ) {}

  public async execute({ photoId }: Request): Promise<Photo> {
    const photo = await this.photosRepository.findById(photoId);
    if (!photo) {
      throw new AppError('Photo not found');
    }

    return photo;
  }
}
