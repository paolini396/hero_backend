import Comic from '../infra/typeorm/entities/Comic';
import ICreateComicDTO from '../dtos/ICreateComicDTO';

export default interface IComicsRepository {
  create(data: ICreateComicDTO): Promise<Comic>;
  findByMarvelId(marvel_id: number): Promise<Comic | undefined>;
  list(): Promise<Comic[]>;
}
