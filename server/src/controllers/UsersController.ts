import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';
import { z } from 'zod';

import { CreateUserService } from '../services/users/CreateUserService';
import { ShowUserService } from '../services/users/ShowUserService';

const createUserSchema = z.object({
  realName: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  isAdmin: z.boolean().optional(),
});

export class UsersController {
  async create(request: Request, response: Response) {
    const { realName, username, email, password, avatar, bio, isAdmin } =
      createUserSchema.parse(request.body);

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
