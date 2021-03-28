import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IComicsRepository from '@modules/comics/repositories/IComicsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserComicsRepository from '@modules/users/repositories/IUserComicsRepository';
import UserComics from '../infra/typeorm/entities/UserComics';

interface IComic {
  id: string;
  title?: string;
}

interface IRequest {
  user_id: string;
  comics: IComic[];
}

@injectable()
class CreateUserComicsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ComicsRepository')
    private comicsRepository: IComicsRepository,

    @inject('UserComicsRepository')
    private userComicsRepository: IUserComicsRepository,
  ) {}

  public async execute({
    user_id,
    comics,
  }: IRequest): Promise<UserComics | undefined> {
    const comicIds = comics.map(comic => {
      return { id: comic.id };
    });

    const userExist = await this.usersRepository.findById(user_id);

    if (!userExist) {
      throw new AppError('Usuário não foi encontrado.');
    }

    const comicsData = await this.comicsRepository.findAllById(comicIds);

    const userComics = await this.userComicsRepository.create({
      user: userExist,
      user_comics: comicsData,
    });

    return userComics;
  }
}

export default CreateUserComicsService;
