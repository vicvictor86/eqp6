import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

import { CreatePhotoService } from 'services/photos/CreatePhotoService';
import { DeletePhotoService } from 'services/photos/DeletePhotoService';
import { ShowPhotoService } from 'services/photos/ShowPhotoService';

import { container } from 'tsyringe';
import { z } from 'zod';

const createPhotoSchema = z.object({
  userId: z.string().uuid(),
  path: z.string(),
});

const deletePhotoSchema = z.object({
  userId: z.string().uuid(),
  path: z.string(),
  photoId: z.string().uuid(),
});

export class PhotosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { userId, path } = createPhotoSchema.parse({
      userId: request.user.id,
      path: request.file?.filename,
    });

    const byteImageSize = request.file?.size;
    const createPhotoService = container.resolve(CreatePhotoService);

    const photo = await createPhotoService.execute({
      userId,
      path,
      byteImageSize,
    });

    return response.json(instanceToInstance(photo));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showPhotoService = container.resolve(ShowPhotoService);

    const photos = await showPhotoService.execute(userId);

    return response.json(photos);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { userId, photoId, path } = deletePhotoSchema.parse({
      userId: request.user.id,
      path: request.body.path,
      photoId: request.body.photoId,
    });

    const deletePhotoService = container.resolve(DeletePhotoService);

    const photo = await deletePhotoService.execute({
      userId,
      photoId,
      path,
    });

    return response.json(instanceToInstance(photo));
  }
}
