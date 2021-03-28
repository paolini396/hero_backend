import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserCharactersService from '@modules/users/services/CreateUserCharactersService';

export default class UserCharactersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, characters } = request.body;

    const createUserCharactersService = container.resolve(
      CreateUserCharactersService,
    );

    const userCharacters = await createUserCharactersService.execute({
      user_id,
      characters,
    });

    return response.json({ user_characters: userCharacters });
  }
}
