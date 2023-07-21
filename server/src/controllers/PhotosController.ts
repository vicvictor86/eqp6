import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { CreatePhotoService } from 'services/photos/CreatePhotoService';
import { container } from 'tsyringe';
import { z } from 'zod';

const createPhotoSchema = z.object({
  userId: z.string().uuid(),
  path: z.string(),
});

export class PhotosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { userId, path } = createPhotoSchema.parse({
      userId: request.user.id,
      path: request.file?.filename,
    });

    const createPhotoService = container.resolve(CreatePhotoService);

    const user = await createPhotoService.execute({
      userId,
      path,
    });

    return response.json(instanceToInstance(user));
  }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const { userId, avatarFilename } = updateUserAvatarSchema.parse({
  //     userId: request.user.id,
  //     avatarFilename: request.file?.filename,
  //   });

  //   const updateUserAvatar = container.resolve(UpdateUserAvatarService);

  //   const user = await updateUserAvatar.execute({
  //     userId,
  //     avatarFilename,
  //   });

  //   return response.json(instanceToInstance(user));
  // }
}
