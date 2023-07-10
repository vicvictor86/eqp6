import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import { AuthenticateUserService } from '../services/users/AuthenticateUserService';

export class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json({ user: instanceToInstance(user), token });
  }
}
