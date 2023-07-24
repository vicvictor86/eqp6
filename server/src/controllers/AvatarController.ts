import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { UpdateUserAvatarService } from '../services/users/UpdateUserAvatarService';

const updateUserAvatarSchema = z.object({
  userId: z.string().uuid(),
  avatarFilename: z.string(),
});

export class AvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { userId, avatarFilename } = updateUserAvatarSchema.parse({
      userId: request.user.id,
      avatarFilename: request.file?.filename,
    });

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      userId,
      avatarFilename,
    });

    return response.json(instanceToInstance(user));
  }
}
