import { injectable, inject } from 'tsyringe';

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
    const comics = await this.comicsRepository.list();

    return comics;
  }
}

export default ListComicService;
