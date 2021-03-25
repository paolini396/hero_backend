/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import { Request, Response } from 'express';
import apiMarvel from '@config/marvel';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import CreateComicService from '@modules/comics/services/CreateComicService';

export default class processAllComicsController {
  public async processAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createService = container.resolve(CreateComicService);

    try {
      const { data } = await apiMarvel
        .get('/comics')
        .then(res => res.data)
        .catch(err => new AppError(err.message));

      const { results } = data;

      for (const result of results) {
        await createService.execute({
          title: result.title,
          description: result.description,
          marvel_id: result.id,
          image_url: result.thumbnail?.path,
          extension: result.thumbnail?.extension,
        });
      }

      return response.json({ message: 'Comics Cadastrados com sucesso!' });
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
