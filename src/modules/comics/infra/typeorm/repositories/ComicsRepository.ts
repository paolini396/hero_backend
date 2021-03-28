import { getRepository, In, Repository } from 'typeorm';

import IComicsRepository from '@modules/comics/repositories/IComicsRepository';
import ICreateComicDTO from '@modules/comics/dtos/ICreateComicDTO';
import IFindComicsDTO from '@modules/comics/dtos/IFindComicsDTO';

import AppError from '@shared/errors/AppError';
import Comic from '../entities/Comic';

class ComicsRepository implements IComicsRepository {
  private ormRepository: Repository<Comic>;

  constructor() {
    this.ormRepository = getRepository(Comic);
  }

  public async list(): Promise<Comic[]> {
    const comics = await this.ormRepository.find({
      order: {
        title: 'ASC',
        id: 'DESC',
      },
    });

    return comics;
  }

  public async findById(id: string): Promise<Comic | undefined> {
    const findComic = await this.ormRepository.findOne(id);

    return findComic;
  }

  public async findByMarvelId(marvel_id: number): Promise<Comic | undefined> {
    const findMarvelId = await this.ormRepository.findOne({
      where: { marvel_id },
    });

    return findMarvelId;
  }

  public async findAllById(comics: IFindComicsDTO[]): Promise<Comic[]> {
    const findComics = await this.ormRepository.find({
      where: { id: In(comics.map(item => item.id)) },
    });

    if (findComics.length !== comics.length) {
      throw new AppError('Um ou mais Comics não foram encontrados!');
    }

    return findComics;
  }

  public async create(data: ICreateComicDTO): Promise<Comic> {
    const comic = this.ormRepository.create(data);

    await this.ormRepository.save(comic);

    return comic;
  }
}

export default ComicsRepository;
