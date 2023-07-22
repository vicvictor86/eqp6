import { IPhotosRepository } from '@models/repositories/interfaces/IPhotosRepository';
import { Photo } from '@models/entities/Photo';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class GetPhotosByUserService {
  constructor(
    @inject('PhotosRepository')
    private photosRepository: IPhotosRepository,
  ) {}

  public async execute(userId: string): Promise<Photo[]> {
    const photos = await this.photosRepository.findAllByUserId(userId);

    if (!photos || photos.length === 0) {
      throw new AppError('No photos found for this user.');
    }

    return photos;
  }
}
