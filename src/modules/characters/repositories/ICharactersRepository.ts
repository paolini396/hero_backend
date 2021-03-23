import Character from '../infra/typeorm/entities/Character';
import ICreateCharacterDTO from '../dtos/ICreateCharacterDTO';

export default interface IComicsRepository {
  create(data: ICreateCharacterDTO): Promise<Character>;
  findByMarvelId(marvel_id: number): Promise<Character | undefined>;
  list(): Promise<Character[]>;
}
