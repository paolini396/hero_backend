import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCharacterService from '@modules/characters/services/CreateCharacterService';
import ListCharacterService from '@modules/characters/services/ListCharacterService';

export default class CharactersController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { search } = request.params;

    const listService = container.resolve(ListCharacterService);

    const characters = await listService.execute({ search });

    return response.json({ characters });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { marvel_id, name, description, image_url } = request.body;

    const createService = container.resolve(CreateCharacterService);

    const character = await createService.execute({
      marvel_id,
      name,
      description,
      image_url,
    });

    return response.json({ character });
  }
}
