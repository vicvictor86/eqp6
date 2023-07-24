import { FakePhotosRepository } from '@models/repositories/fakes/FakePhotosRepository';
import { FakeStorageProvider } from '@shared/container/providers/DiskStorageProvider/fakes/FakeStorageProvider';

import { AppError } from '@shared/errors/AppError';

import { FakeUsersRepository } from '../../../models/repositories/fakes/FakeUsersRepository';
import { CreatePhotoService } from '../CreatePhotoService';
import { DeletePhotoService } from '../DeletePhotoService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakePhotosRepository: FakePhotosRepository;

let createPhotoService: CreatePhotoService;
let deletePhotoService: DeletePhotoService;

describe('DeletePhotoService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakePhotosRepository = new FakePhotosRepository();

    createPhotoService = new CreatePhotoService(
      fakeUsersRepository,
      fakePhotosRepository,
      fakeStorageProvider,
    );
    deletePhotoService = new DeletePhotoService(
      fakeUsersRepository,
      fakePhotosRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to delete a photo', async () => {
    const user = await fakeUsersRepository.create({
      realName: 'test',
      username: 'testUser',
      email: 'test@example.com',
      password: '123456',
      isAdmin: false,
      confirmed: false,
    });

    await createPhotoService.execute({
      userId: user.id,
      path: 'photo.jpg',
      byteImageSize: 100,
    });

    const userPhotos = await fakePhotosRepository.findByUserId(user.id);

    if (!userPhotos) {
      throw new Error('User photos not found');
    }

    const photoUploadedRecently = userPhotos.find(photo => {
      return photo.path === 'photo.jpg';
    });

    if (!photoUploadedRecently) {
      throw new Error('Photo not found');
    }

    const photo = await deletePhotoService.execute({
      userId: user.id,
      photoId: photoUploadedRecently.id,
      path: photoUploadedRecently.path,
    });

    const newUserPhotos = await fakePhotosRepository.findByUserId(user.id);

    expect(newUserPhotos).toEqual(null);
    expect(photo.path).toBe('photo.jpg');
  });

  it('should NOT be able to delete a photo to a non existing user', async () => {
    await expect(
      deletePhotoService.execute({
        userId: 'non-existing-user',
        path: 'photo.jpg',
        photoId: 'non-existing-photo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to delete a non existing photo', async () => {
    const user = await fakeUsersRepository.create({
      realName: 'test',
      username: 'testUser',
      email: 'test@example.com',
      password: '123456',
      isAdmin: false,
      confirmed: false,
    });

    await createPhotoService.execute({
      userId: user.id,
      path: 'photo.jpg',
      byteImageSize: 100,
    });

    const userPhotos = await fakePhotosRepository.findByUserId(user.id);

    if (!userPhotos) {
      throw new Error('User photos not found');
    }

    const photoUploadedRecently = userPhotos.find(photo => {
      return photo.path === 'photo.jpg';
    });

    if (!photoUploadedRecently) {
      throw new Error('Photo not found');
    }

    await expect(
      deletePhotoService.execute({
        userId: user.id,
        photoId: 'non-existing-photo',
        path: 'non-existing-photo.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
