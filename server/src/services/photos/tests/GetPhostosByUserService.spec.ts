import { FakePhotosRepository } from '@models/repositories/fakes/FakePhotosRepository';
import { AppError } from '@shared/errors/AppError';
import { FakeStorageProvider } from '@shared/container/providers/DiskStorageProvider/fakes/FakeStorageProvider';
import { GetPhotosByUserService } from '../GetPhotosByUserService';
import { FakeUsersRepository } from '../../../models/repositories/fakes/FakeUsersRepository';
import { CreatePhotoService } from '../CreatePhotoService';

let fakeUsersRepository: FakeUsersRepository;
let fakePhotosRepository: FakePhotosRepository;
let fakeStorageProvider: FakeStorageProvider;
let getPhotosByUserService: GetPhotosByUserService;
let createPhotoService: CreatePhotoService;

describe('GetPhotosByUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePhotosRepository = new FakePhotosRepository();
    fakeStorageProvider = new FakeStorageProvider();
    getPhotosByUserService = new GetPhotosByUserService(fakePhotosRepository);
    createPhotoService = new CreatePhotoService(
      fakeUsersRepository,
      fakePhotosRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to get all photos by user id', async () => {
    const user = await fakeUsersRepository.create({
      realName: 'test',
      username: 'testUser',
      email: 'test@example.com',
      password: '123456',
      isAdmin: false,
    });

    await createPhotoService.execute({
      userId: user.id,
      path: 'photo1.jpg',
      byteImageSize: 100,
    });

    await createPhotoService.execute({
      userId: user.id,
      path: 'photo2.jpg',
      byteImageSize: 100,
    });

    const photos = await getPhotosByUserService.execute(user.id);

    expect(photos).toHaveLength(2);
  });

  it('should throw an error if no photos are found', async () => {
    const user = await fakeUsersRepository.create({
      realName: 'test',
      username: 'testUser',
      email: 'test@example.com',
      password: '123456',
      isAdmin: false,
    });

    expect(getPhotosByUserService.execute(user.id)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
