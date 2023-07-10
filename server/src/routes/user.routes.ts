import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';

import AvatarController from '@controllers/AvatarController';
import { UsersController } from '@controllers/UsersController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticate';

const userRouter = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const avatarController = new AvatarController();

userRouter.get('/', usersController.show);
userRouter.post('/', usersController.create);

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  avatarController.update,
);

export { userRouter };
