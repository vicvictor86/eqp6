import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';

import { CreateUserService } from '../services/users/CreateUserService';
import { ShowUserService } from '../services/users/ShowUserService';

export class UsersController {
  async create(request: Request, response: Response) {
    const { realName, username, email, password, avatar, bio, isAdmin } =
      request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      realName,
      username,
      email,
      password,
      avatar,
      bio,
      isAdmin: isAdmin || false,
    });

    return response.status(200).json(instanceToInstance(user));
  }

  async show(request: Request, response: Response) {
    const showUserService = container.resolve(ShowUserService);

    const users = await showUserService.execute();

    return response.status(200).json(instanceToInstance(users));
  }
}
