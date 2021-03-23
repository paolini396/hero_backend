import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ComicsController from '../controllers/ComicsController';

const comicsRouter = Router();
const comicsController = new ComicsController();

comicsRouter.post('/', ensureAuthenticated, comicsController.create);
comicsRouter.get('/', ensureAuthenticated, comicsController.list);
comicsRouter.get('/:id', ensureAuthenticated, comicsController.show);

export default comicsRouter;
