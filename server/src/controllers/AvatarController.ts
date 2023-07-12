import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import UpdateUserAvatarService from '../services/users/UpdateUserAvatarService';

const updateUserAvatarSchema = z.object({
  userId: z.string().uuid(),
  avatarFileName: z.string(),
});

export default class AvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { userId, avatarFileName } = updateUserAvatarSchema.parse({
        userId: request.user.id,
        avatarFileName: request.file?.filename,
      });

      const updateUserAvatar = container.resolve(UpdateUserAvatarService);

      const user = await updateUserAvatar.execute({
        userId,
        avatarFileName,
      });

      return response.json(instanceToInstance(user));
    } catch (err) {
      return response.status(400).json({ error: (err as Error).message });
    }
  }
}
