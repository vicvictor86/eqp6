import { Router } from 'express';

import { userRouter } from './user.routes';
import { sessionsRouter } from './sessions.routes';
import { photoRouter } from './photo.routes';
import { postRouter } from './post.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/photos', photoRouter);
routes.use('/posts', postRouter);

export default routes;
