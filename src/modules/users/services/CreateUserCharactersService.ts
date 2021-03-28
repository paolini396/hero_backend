import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserCharactersRepository from '@modules/users/repositories/IUserCharactersRepository';
import UserCharacters from '../infra/typeorm/entities/UserCharacters';

interface ICharacter {
  id: string;
  name: string;
}

interface IRequest {
  user_id: string;
  characters: ICharacter[];
}

@injectable()
class CreateUserCharactersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,

    @inject('UserCharactersRepository')
    private userCharactersRepository: IUserCharactersRepository,
  ) {}

  public async execute({
    user_id,
    characters,
  }: IRequest): Promise<UserCharacters[] | undefined> {
    const characterIds = characters.map(character => {
      return { id: character.id };
    });

    const userExist = await this.usersRepository.findById(user_id);

    if (!userExist) {
      throw new AppError('Usuário não foi encontrado.');
    }

    const charactersData = await this.charactersRepository.findAllById(
      characterIds,
    );

    const userCharacters = await this.userCharactersRepository.create({
      user: userExist,
      user_characters: charactersData,
    });

    return userCharacters;
  }
}

export default CreateUserCharactersService;
