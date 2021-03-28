import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserComicsRepository from '@modules/users/repositories/IUserComicsRepository';
import UserComics from '../infra/typeorm/entities/UserComics';

@injectable()
class DestroyUserComicsService {
  constructor(
    @inject('UserComicsRepository')
    private userComicsRepository: IUserComicsRepository,
  ) {}

  public async execute(id: string): Promise<UserComics | undefined> {
    const userComic = await this.userComicsRepository.findById(id);

    if (!userComic) {
      throw new AppError('UserComic não foi encontrado.');
    }

    await this.userComicsRepository.destroy(id);

    return userComic;
  }
}

export default DestroyUserComicsService;
