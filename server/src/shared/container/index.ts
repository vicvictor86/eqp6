import { container } from 'tsyringe';

import './providers';
import '@models/providers';

import { UsersRepository } from '@models/repositories/UserRepository';
import { IUsersRepository } from '@models/repositories/interfaces/IUserRepository';

container.registerInstance<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
