import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ComicsController from '../controllers/ComicsController';

const comicsRouter = Router();
const comicsController = new ComicsController();

comicsRouter.post('/', ensureAuthenticated, comicsController.create);

export default comicsRouter;
