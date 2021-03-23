import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Character from '../infra/typeorm/entities/Character';
import ICharactersRepository from '../repositories/ICharactersRepository';

interface IRequest {
  marvel_id: number;
  name: string;
  description: string;
  image_url: string;
}

@injectable()
class CreateCharacterService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute({
    marvel_id,
    name,
    description,
    image_url,
  }: IRequest): Promise<Character> {
    const checkCharacterExists = await this.charactersRepository.findByMarvelId(
      marvel_id,
    );

    if (checkCharacterExists) {
      throw new AppError('Character already exist.');
    }

    const character = await this.charactersRepository.create({
      marvel_id,
      name,
      description,
      image_url,
    });

    return character;
  }
}

export default CreateCharacterService;
