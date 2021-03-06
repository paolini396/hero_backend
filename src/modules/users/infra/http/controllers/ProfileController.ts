import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import ShowComicService from '@modules/comics/services/ShowComicService';
import ShowCharacterService from '@modules/characters/services/ShowCharacterService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);
    const showComicService = container.resolve(ShowComicService);
    const showCharacterService = container.resolve(ShowCharacterService);

    const user = await showProfile.execute({
      user_id,
    });

    const userComics = user.user_comics.map(async user_comic => {
      const findedComic = await showComicService.execute({
        id: user_comic.comic_id,
      });
      return {
        ...user_comic,
        comic: findedComic,
      };
    });

    const user_comics = await Promise.all(userComics);

    const userCharacters = user.user_characters.map(async user_character => {
      const findedCharacter = await showCharacterService.execute({
        id: user_character.character_id,
      });
      return {
        ...user_character,
        character: findedCharacter,
      };
    });

    const user_characters = await Promise.all(userCharacters);

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      user_comics,
      user_characters,
    };

    return response.json({ user: userWithoutPassword });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
  }
}
