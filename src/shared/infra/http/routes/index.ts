import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import comicsRouter from '@modules/comics/infra/http/routes/comics.routes';
import charactersRouter from '@modules/characters/infra/http/routes/characters.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/comics', comicsRouter);
routes.use('/characters', charactersRouter);

export default routes;
