import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Character from '../infra/typeorm/entities/Character';
import ICharactersRepository from '../repositories/ICharactersRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowCharacterService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Character | undefined> {
    const character = await this.charactersRepository.findById(id);

    if (!character) {
      throw new AppError('Comic não encontrado.');
    }

    return character;
  }
}

export default ShowCharacterService;
