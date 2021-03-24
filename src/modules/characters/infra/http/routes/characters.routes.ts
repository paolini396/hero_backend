import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CharactersController from '../controllers/CharactersController';
import ProcessAllComicsController from '../controllers/ProcessAllCharactersController';

const charactersRouter = Router();
const charactersController = new CharactersController();
const processAllComicsController = new ProcessAllComicsController();

charactersRouter.post('/', ensureAuthenticated, charactersController.create);
charactersRouter.get('/', ensureAuthenticated, charactersController.list);
charactersRouter.patch(
  '/process-all',
  ensureAuthenticated,
  processAllComicsController.processAll,
);
charactersRouter.get('/:id', ensureAuthenticated, charactersController.show);

export default charactersRouter;
