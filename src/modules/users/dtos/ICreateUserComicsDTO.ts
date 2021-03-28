import User from '@modules/users/infra/typeorm/entities/User';

interface IComic {
  id: string;
  title?: string;
}

export default interface ICreateUserComicsDTO {
  user: User;
  user_comics: IComic[];
}
