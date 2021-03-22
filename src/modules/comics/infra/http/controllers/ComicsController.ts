import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateComicService from '@modules/comics/services/CreateComicService';

export default class ComicsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { marvel_id, title, description, image_url } = request.body;

    const createComic = container.resolve(CreateComicService);

    const comic = await createComic.execute({
      marvel_id,
      title,
      description,
      image_url,
    });

    return response.json({ comic });
  }
}
