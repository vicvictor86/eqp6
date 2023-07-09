import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { authConfig } from '@config/auth';

import { IUsersRepository } from '@models/repositories/interfaces/IUserRepository';
import { User } from '@models/User';

import { ICreateLoginSessionsDTO } from 'dtos/ICreateLoginSessionsDTO';

import { AppError } from 'errors/AppError';

interface Response {
  user: User;

  token: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateLoginSessionsDTO): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const hashedPassword = user.password;

    const authenticated = await compare(password, hashedPassword);

    if (!authenticated) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}
