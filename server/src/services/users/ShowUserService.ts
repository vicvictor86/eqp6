import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from 'model/repositories/interfaces/IUserRepository';
import { User } from '../../model/User';

@injectable()
export class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.userRepository.all();

    return users;
  }
}
