import { getRepository, Repository } from 'typeorm';

import IUserComicsRepository from '@modules/users/repositories/IUserComicsRepository';
import ICreateUserComicsDTO from '@modules/users/dtos/ICreateUserComicsDTO';
import UserComics from '../entities/UserComics';

class UserComicsRepository implements IUserComicsRepository {
  private ormRepository: Repository<UserComics>;

  constructor() {
    this.ormRepository = getRepository(UserComics);
  }

  public async create({
    user,
    user_comics,
  }: ICreateUserComicsDTO): Promise<UserComics | undefined> {
    const userComic = await this.ormRepository.create({
      user_id: user.id,
      comic_id: user_comics[0].id,
      comic: user_comics[0],
    });

    await this.ormRepository.save(userComic);

    return userComic;
  }
}

export default UserComicsRepository;
