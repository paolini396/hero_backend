import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ComicsController from '../controllers/ComicsController';
import ProcessAllComicsController from '../controllers/ProcessAllComicsController';

const comicsRouter = Router();
const comicsController = new ComicsController();
const processAllComicsController = new ProcessAllComicsController();

comicsRouter.post('/', ensureAuthenticated, comicsController.create);
comicsRouter.get('/', ensureAuthenticated, comicsController.list);
comicsRouter.patch(
  '/process-all',
  ensureAuthenticated,
  processAllComicsController.processAll,
);
comicsRouter.get('/:id', ensureAuthenticated, comicsController.show);

export default comicsRouter;
