import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IComicsRepository from '@modules/comics/repositories/IComicsRepository';
import ComicsRepository from '@modules/comics/infra/typeorm/repositories/ComicsRepository';

import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import CharactersRepository from '@modules/characters/infra/typeorm/repositories/CharactersRepository';

import IUserComicsRepository from '@modules/users/repositories/IUserComicsRepository';
import UserComicsRepository from '@modules/users/infra/typeorm/repositories/UserComicsRepository';

import IUserCharactersRepository from '@modules/users/repositories/IUserCharactersRepository';
import UserCharactersRepository from '@modules/users/infra/typeorm/repositories/UserCharactersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IComicsRepository>(
  'ComicsRepository',
  ComicsRepository,
);

container.registerSingleton<ICharactersRepository>(
  'CharactersRepository',
  CharactersRepository,
);

container.registerSingleton<IUserComicsRepository>(
  'UserComicsRepository',
  UserComicsRepository,
);

container.registerSingleton<IUserCharactersRepository>(
  'UserCharactersRepository',
  UserCharactersRepository,
);
