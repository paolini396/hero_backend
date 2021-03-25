import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Comic from '../infra/typeorm/entities/Comic';
import IComicsRepository from '../repositories/IComicsRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowComicService {
  constructor(
    @inject('ComicsRepository')
    private comicsRepository: IComicsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Comic> {
    const comic = await this.comicsRepository.findById(id);

    if (!comic) {
      throw new AppError('Comic não encontrado.');
    }

    return comic;
  }
}

export default ShowComicService;
