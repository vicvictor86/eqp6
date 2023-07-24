import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import { AvatarController } from '@controllers/AvatarController';
import { UsersController } from '@controllers/UsersController';

import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticate';
import { EnsureEmailConfirmationMiddleware } from '@shared/middlewares/EnsureEmailConfirmationMiddleware';

import { uploadConfig } from '@config/upload';

const userRouter = Router();
const uploadMiddleware = multer(uploadConfig.multer);

const usersController = new UsersController();
const avatarController = new AvatarController();
const ensureEmailConfirmation = container.resolve(
  EnsureEmailConfirmationMiddleware,
);

userRouter.get('/', usersController.show);
userRouter.post('/', usersController.create);

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  ensureEmailConfirmation.execute,
  uploadMiddleware.single('avatar'),
  avatarController.update,
);

export { userRouter };
