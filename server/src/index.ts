import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import '@models/database/dataSource';

import { uploadConfig } from '@config/upload';

import { AppError } from '@shared/errors/AppError';
import '@shared/container';

import routes from './routes';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err.message);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => console.log('server running on port 3333'));
