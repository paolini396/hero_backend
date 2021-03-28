import Comic from '../infra/typeorm/entities/Comic';
import ICreateComicDTO from '../dtos/ICreateComicDTO';
import IFindComicsDTO from '../dtos/IFindComicsDTO';

export default interface IComicsRepository {
  create(data: ICreateComicDTO): Promise<Comic>;
  findByMarvelId(marvel_id: number): Promise<Comic | undefined>;
  findAllById(comics: IFindComicsDTO[]): Promise<Comic[]>;
  list(): Promise<Comic[]>;
  findById(id: string): Promise<Comic | undefined>;
}
