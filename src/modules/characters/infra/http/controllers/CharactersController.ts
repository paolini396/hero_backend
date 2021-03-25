import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCharacterService from '@modules/characters/services/ListCharacterService';
import ShowCharacterService from '@modules/characters/services/ShowCharacterService';
import CreateCharacterService from '@modules/characters/services/CreateCharacterService';

export default class CharactersController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { search } = request.params;

    const listService = container.resolve(ListCharacterService);

    const characters = await listService.execute({ search });

    return response.json({ characters });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showService = container.resolve(ShowCharacterService);

    const character = await showService.execute({
      id,
    });

    return response.json({ character });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { marvel_id, name, description, image_url, extension } = request.body;

    const createService = container.resolve(CreateCharacterService);

    const character = await createService.execute({
      marvel_id,
      name,
      description,
      image_url,
      extension,
    });

    return response.json({ character });
  }
}
