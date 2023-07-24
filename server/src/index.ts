import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import { ZodError } from 'zod';

import cors from 'cors';

import '@models/database/dataSource';

import { uploadConfig } from '@config/upload';

import { AppError } from '@shared/errors/AppError';
import '@shared/container';

<<<<<<< HEAD
import routes from './routes';
const cors = require('cors');

const app = express();
app.use(cors())
=======
import { routes } from './routes';

const app = express();

app.use(cors());
>>>>>>> origin/devVictor
app.use(express.json());
app.use('/files/avatar', express.static(uploadConfig.avatarFolder));
app.use('/files/photos', express.static(uploadConfig.photosFolder));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: err.issues,
    });
  }

  console.log(err.message);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => console.log('server running on port 3333'));


