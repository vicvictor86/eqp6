import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@models/repositories/interfaces/IUserRepository';
import { ICreateUserDTO } from '@models/dtos/ICreateUserDTO';
import { User } from '@models/User';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute(data: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByUsernameOrEmail(
      data.username,
      data.email,
    );

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const hashedPassword = await hash(data.password, 8);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return user;
  }
}
