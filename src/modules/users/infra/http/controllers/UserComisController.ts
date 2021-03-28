import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserComicsService from '@modules/users/services/CreateUserComicsService';
import DestroyUserComicsService from '@modules/users/services/DestroyUserComicsService';

export default class UserComicsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, comics } = request.body;

    const createUserComicService = container.resolve(CreateUserComicsService);

    const userComics = await createUserComicService.execute({
      user_id,
      comics,
    });

    return response.json({ user_comics: userComics });
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const destroyUserComicsService = container.resolve(
      DestroyUserComicsService,
    );

    const userComics = await destroyUserComicsService.execute(id);

    return response.json({ user_comics: userComics });
  }
}
