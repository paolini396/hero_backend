import ICreateUserCharactersDTO from '@modules/users/dtos/ICreateUserCharactersDTO';
import UserCharacters from '../infra/typeorm/entities/UserCharacters';

export default interface IUserCharactersRepository {
  create(data: ICreateUserCharactersDTO): Promise<UserCharacters[] | undefined>;
  findById(id: string): Promise<UserCharacters | undefined>;
  destroy(id: string): Promise<UserCharacters | undefined>;
}
