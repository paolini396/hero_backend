import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserCharactersRepository from '@modules/users/repositories/IUserCharactersRepository';
import UserCharacters from '../infra/typeorm/entities/UserCharacters';

@injectable()
class DestroyUserCharactersService {
  constructor(
    @inject('UserCharactersRepository')
    private userCharactersRepository: IUserCharactersRepository,
  ) {}

  public async execute(id: string): Promise<UserCharacters | undefined> {
    const userCharacter = await this.userCharactersRepository.findById(id);

    if (!userCharacter) {
      throw new AppError('UserCharacter não foi encontrado.');
    }

    await this.userCharactersRepository.destroy(id);

    return userCharacter;
  }
}

export default DestroyUserCharactersService;
