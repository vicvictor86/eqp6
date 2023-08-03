import { Router } from 'express';

import { userRouter } from './user.routes';
import { sessionsRouter } from './sessions.routes';
import { photoRouter } from './photo.routes';
import { postRouter } from './post.routes';
import { commentsRouter } from './comments.routes';
import { commentsEvaluationsRouter } from './commentsEvaluation.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/photos', photoRouter);
routes.use('/posts', postRouter);
routes.use('/comments', commentsRouter);
routes.use('/comments-evaluations', commentsEvaluationsRouter);

export default routes;
