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
    private usersRepository: IComicsRepository,
  ) {}

  public async execute({
    marvel_id,
    title,
    description,
    image_url,
  }: IRequest): Promise<Comic> {
    const checkComicExists = await this.usersRepository.findByMarvelId(
      marvel_id,
    );

    if (checkComicExists) {
      throw new AppError('Comic already exist.');
    }

    const comic = await this.usersRepository.create({
      marvel_id,
      title,
      description,
      image_url,
    });

    return comic;
  }
}

export default CreateComicService;
