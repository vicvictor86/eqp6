import { container } from 'tsyringe';

import './providers';
import '@models/providers';

import { UsersRepository } from '@models/repositories/UserRepository';
import { IUsersRepository } from '@models/repositories/interfaces/IUserRepository';

import { PhotosRepository } from '@models/repositories/PhotoRepository';
import { IPhotosRepository } from '@models/repositories/interfaces/IPhotosRepository';

import { PostRepository } from '@models/repositories/PostRepository';
import { IPostsRepository } from '@models/repositories/interfaces/IPostsRepository';

container.registerInstance<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerInstance<IPhotosRepository>(
  'PhotosRepository',
  PhotosRepository,
);

container.registerInstance<IPostsRepository>('PostsRepository', PostRepository);
