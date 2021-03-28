import ICreateUserComicsDTO from '@modules/users/dtos/ICreateUserComicsDTO';
import UserComics from '../infra/typeorm/entities/UserComics';

export default interface IUserComicsRepository {
  create(data: ICreateUserComicsDTO): Promise<UserComics[] | undefined>;
  findById(id: string): Promise<UserComics | undefined>;
  destroy(id: string): Promise<UserComics | undefined>;
}
