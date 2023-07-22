import { Router } from 'express';
import multer from 'multer';

import { PhotosController } from '@controllers/PhotosController';
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticate';
import { uploadConfig } from '@config/upload';

const photoRouter = Router();
const photoController = new PhotosController();
const uploadMiddleware = multer(uploadConfig.multer);

photoRouter.delete('/', ensureAuthenticated, photoController.delete);
photoRouter.post(
  '/',
  ensureAuthenticated,
  uploadMiddleware.single('photo'),
  photoController.create,
);

export { photoRouter };
