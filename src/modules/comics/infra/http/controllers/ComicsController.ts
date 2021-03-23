import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListComicService from '@modules/comics/services/ListComicService';
import ShowComicService from '@modules/comics/services/ShowComicService';
import CreateComicService from '@modules/comics/services/CreateComicService';

export default class ComicsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { search } = request.params;

    const listService = container.resolve(ListComicService);

    const comics = await listService.execute({ search });

    return response.json({ comics });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showService = container.resolve(ShowComicService);

    const comic = await showService.execute({
      id,
    });

    return response.json({ comic });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { marvel_id, title, description, image_url } = request.body;

    const createService = container.resolve(CreateComicService);

    const comic = await createService.execute({
      marvel_id,
      title,
      description,
      image_url,
    });

    return response.json({ comic });
  }
}
