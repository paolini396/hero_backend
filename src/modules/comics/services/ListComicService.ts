import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import Comic from '../infra/typeorm/entities/Comic';
import IComicsRepository from '../repositories/IComicsRepository';

interface IRequest {
  search?: string;
}

@injectable()
class ListComicService {
  constructor(
    @inject('ComicsRepository')
    private comicsRepository: IComicsRepository,
  ) {}

  public async execute({ search }: IRequest): Promise<Comic[]> {
    console.log({ search });
    const comics = await this.comicsRepository.list();

    return comics;
  }
}

export default ListComicService;
