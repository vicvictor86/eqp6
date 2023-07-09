import { container } from 'tsyringe';

import { UsersRepository } from 'model/repositories/UserRepository';
import { IUsersRepository } from 'model/repositories/interfaces/IUserRepository';

container.registerInstance<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
