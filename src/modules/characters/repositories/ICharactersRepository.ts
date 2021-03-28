import Character from '../infra/typeorm/entities/Character';
import ICreateCharacterDTO from '../dtos/ICreateCharacterDTO';
import IFindCharactersDTO from '../dtos/IFindCharactersDTO';

export default interface IComicsRepository {
  create(data: ICreateCharacterDTO): Promise<Character>;
  findByMarvelId(marvel_id: number): Promise<Character | undefined>;
  findAllById(characters: IFindCharactersDTO[]): Promise<Character[]>;
  list(): Promise<Character[]>;
  findById(id: string): Promise<Character | undefined>;
}
