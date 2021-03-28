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
  }: ICreateUserComicsDTO): Promise<UserComics[] | undefined> {
    const userComics = await user_comics.map(async user_comic => {
      const createComic = await this.ormRepository.create({
        comic_id: user_comic.id,
        user_id: user.id,
        comic: user_comic,
      });

      await this.ormRepository.save(createComic);
      return createComic;
    });

    const userComicsData = await Promise.all(userComics);

    return userComicsData;
  }

  public async findById(id: string): Promise<UserComics | undefined> {
    const findedUserComic = await this.ormRepository.findOne(id);

    return findedUserComic;
  }

  public async destroy(id: string): Promise<UserComics | undefined> {
    const userComic = await this.ormRepository.findOne(id);

    await this.ormRepository.delete(id);

    return userComic;
  }
}

export default UserComicsRepository;
