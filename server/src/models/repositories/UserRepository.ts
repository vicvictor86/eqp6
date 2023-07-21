import { connectionSource } from '@models/database/dataSource';
import { User } from '@models/entities/User';

import { ICreateUserDTO } from '@models/dtos/ICreateUserDTO';
import { IUsersRepository } from './interfaces/IUserRepository';

const usersRepository = connectionSource.getRepository(User);

export const UsersRepository: IUsersRepository = usersRepository.extend({
  async findById(id: string): Promise<User | null> {
    const user = await usersRepository.findOne({
      where: {
        id,
      },
    });
    return user;
  },

  async findByEmail(email: string): Promise<User | null> {
    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  },

  async findByUsernameOrEmail(
    username: string,
    email: string,
  ): Promise<User | null> {
    const user = await usersRepository.findOne({
      where: [
        {
          username,
        },
        {
          email,
        },
      ],
    });
    return user;
  },

  async create(userData: ICreateUserDTO): Promise<User> {
    const users = usersRepository.create(userData);

    await usersRepository.save(users);

    return users;
  },

  async save(user: User): Promise<User> {
    return usersRepository.save(user);
  },

  async all(): Promise<User[]> {
    return usersRepository.find();
  },

  async findByUsername(username: string): Promise<User | null> {
    return usersRepository.findOne({
      where: {
        username,
      },
    });
  },
});
