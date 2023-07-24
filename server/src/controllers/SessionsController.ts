import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { z } from 'zod';

import { AuthenticateUserService } from '../services/users/AuthenticateUserService';

const authenticateSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = authenticateSchema.parse(request.body);

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json({ user: instanceToInstance(user), token });
  }
}
