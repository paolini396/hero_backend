import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Comic from '../infra/typeorm/entities/Comic';
import IComicsRepository from '../repositories/IComicsRepository';

interface IRequest {
  marvel_id: number;
  title: string;
  description: string;
  image_url: string;
}

@injectable()
class CreateComicService {
  constructor(
    @inject('ComicsRepository')
    private comicsRepository: IComicsRepository,
  ) {}

  public async execute({
    marvel_id,
    title,
    description,
    image_url,
  }: IRequest): Promise<Comic> {
    try {
      const checkComicExists = await this.comicsRepository.findByMarvelId(
        marvel_id,
      );

      if (checkComicExists) {
        throw new AppError('Comic já existe.');
      }

      const comic = await this.comicsRepository.create({
        marvel_id,
        title,
        description,
        image_url,
      });

      return comic;
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}

export default CreateComicService;
