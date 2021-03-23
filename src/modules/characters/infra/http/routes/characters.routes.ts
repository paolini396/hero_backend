import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CharactersController from '../controllers/CharactersController';

const charactersRouter = Router();
const charactersController = new CharactersController();

charactersRouter.post('/', ensureAuthenticated, charactersController.create);
charactersRouter.get('/', ensureAuthenticated, charactersController.list);

export default charactersRouter;
