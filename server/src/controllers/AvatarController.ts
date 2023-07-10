import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '../services/users/UpdateUserAvatarService';

export default class AvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateUserAvatar = container.resolve(UpdateUserAvatarService);

      const user = await updateUserAvatar.execute({
        userId: request.user.id,
        avatarFileName: request.file?.filename,
      });

      return response.json(instanceToInstance(user));
    } catch (err) {
      return response.status(400).json({ error: (err as Error).message });
    }
  }
}
