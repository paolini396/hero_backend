/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import { Request, Response } from 'express';
import apiMarvel from '@config/marvel';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import CreateCharacterService from '@modules/characters/services/CreateCharacterService';

export default class processAllCharactersController {
  public async processAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createService = container.resolve(CreateCharacterService);

    try {
      const { data } = await apiMarvel
        .get('/characters')
        .then(res => res.data)
        .catch(err => new AppError(err.message));

      const { results } = data;

      for (const result of results) {
        await createService.execute({
          name: result.name,
          description: result.description,
          image_url: result.thumbnail.path,
          marvel_id: result.id,
        });
      }

      return response.json({ message: 'Characters Cadastrados com sucesso!' });
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
