import { getRepository, In, Repository } from 'typeorm';

import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import ICreateCharacterDTO from '@modules/characters/dtos/ICreateCharacterDTO';
import IFindCharactersDTO from '@modules/characters/dtos/IFindCharactersDTO';

import AppError from '@shared/errors/AppError';
import Character from '../entities/Character';

class CharactersRepository implements ICharactersRepository {
  private ormRepository: Repository<Character>;

  constructor() {
    this.ormRepository = getRepository(Character);
  }

  public async list(): Promise<Character[]> {
    const characters = await this.ormRepository.find({
      order: {
        name: 'ASC',
        id: 'DESC',
      },
    });

    return characters;
  }

  public async findById(id: string): Promise<Character | undefined> {
    const findCharacter = await this.ormRepository.findOne(id);

    return findCharacter;
  }

  public async findByMarvelId(
    marvel_id: number,
  ): Promise<Character | undefined> {
    const findMarvelId = await this.ormRepository.findOne({
      where: { marvel_id },
    });

    return findMarvelId;
  }

  public async findAllById(
    characters: IFindCharactersDTO[],
  ): Promise<Character[]> {
    const findCharacters = await this.ormRepository.find({
      where: { id: In(characters.map(item => item.id)) },
    });

    if (findCharacters.length !== characters.length) {
      throw new AppError('Um ou mais Characters não foram encontrados!');
    }

    return findCharacters;
  }

  public async create(data: ICreateCharacterDTO): Promise<Character> {
    const character = this.ormRepository.create(data);

    await this.ormRepository.save(character);

    return character;
  }
}

export default CharactersRepository;
