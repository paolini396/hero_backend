import { getRepository, Repository } from 'typeorm';

import IUserCharactersRepository from '@modules/users/repositories/IUserCharactersRepository';
import ICreateUserCharactersDTO from '@modules/users/dtos/ICreateUserCharactersDTO';
import UserCharacters from '../entities/UserCharacters';

class UserCharactersRepository implements IUserCharactersRepository {
  private ormRepository: Repository<UserCharacters>;

  constructor() {
    this.ormRepository = getRepository(UserCharacters);
  }

  public async create({
    user,
    user_characters,
  }: ICreateUserCharactersDTO): Promise<UserCharacters[] | undefined> {
    const userCharacter = user_characters.map(async user_character => {
      const createCharacter = await this.ormRepository.create({
        character_id: user_character.id,
        user_id: user.id,
        character: user_character,
      });

      await this.ormRepository.save(createCharacter);
      return createCharacter;
    });

    const userCharactersData = await Promise.all(userCharacter);

    return userCharactersData;
  }
}

export default UserCharactersRepository;
