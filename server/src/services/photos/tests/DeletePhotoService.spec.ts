import { FakeUsersRepository } from '@models/repositories/fakes/FakeUsersRepository';
import { FakePhotosRepository } from '@models/repositories/fakes/FakePhotosRepository';
import { FakeStorageProvider } from '@shared/container/providers/DiskStorageProvider/fakes/FakeStorageProvider';
import { AppError } from '@shared/errors/AppError';
import { DeletePhotoService } from '../DeletePhotoService';

let fakeUsersRepository: FakeUsersRepository;
let fakePhotosRepository: FakePhotosRepository;
let fakeStorageProvider: FakeStorageProvider;
let deletePhotoService: DeletePhotoService;

describe('DeletePhotoService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePhotosRepository = new FakePhotosRepository();
    fakeStorageProvider = new FakeStorageProvider();
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
    });

    const photo = await fakePhotosRepository.create({
      userId: user.id,
      path: 'photo.jpg',
    });

    await deletePhotoService.execute({
      userId: user.id,
      photoId: photo.id,
      path: photo.path,
    });

    const userPhotos = await fakePhotosRepository.findByUserId(user.id);

    expect(userPhotos).toHaveLength(0);
  });

  it('should NOT be able to delete a photo if user does not exist', async () => {
    const photo = await fakePhotosRepository.create({
      userId: 'non-existing-user-id',
      path: 'photo.jpg',
    });

    await expect(
      deletePhotoService.execute({
        userId: 'non-existing-user-id',
        photoId: photo.id,
        path: photo.path,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to delete a photo if photo does not exist', async () => {
    const user = await fakeUsersRepository.create({
      realName: 'test',
      username: 'testUser',
      email: 'test@example.com',
      password: '123456',
      isAdmin: false,
    });

    await expect(
      deletePhotoService.execute({
        userId: user.id,
        photoId: 'non-existing-photo-id',
        path: 'non-existing-photo-path',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
