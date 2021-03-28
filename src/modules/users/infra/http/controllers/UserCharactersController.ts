import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserCharactersService from '@modules/users/services/CreateUserCharactersService';
import DestroyUserCharactersService from '@modules/users/services/DestroyUserCharactersService';

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

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const destroyUserCharactersService = container.resolve(
      DestroyUserCharactersService,
    );

    const userCharacters = await destroyUserCharactersService.execute(id);

    return response.json({ user_characters: userCharacters });
  }
}
