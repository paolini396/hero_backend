import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import Character from '../infra/typeorm/entities/Character';
import ICharactersRepository from '../repositories/ICharactersRepository';

interface IRequest {
  search?: string;
}

@injectable()
class ListCharacterService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute({ search }: IRequest): Promise<Character[]> {
    const characters = await this.charactersRepository.list();

    return characters;
  }
}

export default ListCharacterService;
