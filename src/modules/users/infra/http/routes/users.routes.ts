import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserComisController from '../controllers/UserComisController';
import UserCharactersController from '../controllers/UserCharactersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const userComisController = new UserComisController();
const userCharactersController = new UserCharactersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);
usersRouter.post('/comics', ensureAuthenticated, userComisController.create);
usersRouter.post(
  '/characters',
  ensureAuthenticated,
  userCharactersController.create,
);
usersRouter.delete(
  '/comics/:id',
  ensureAuthenticated,
  userComisController.destroy,
);
usersRouter.delete(
  '/characters/:id',
  ensureAuthenticated,
  userCharactersController.destroy,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);
export default usersRouter;
