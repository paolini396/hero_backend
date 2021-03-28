import ICreateUserCharactersDTO from '@modules/users/dtos/ICreateUserCharactersDTO';
import UserCharacters from '../infra/typeorm/entities/UserCharacters';

export default interface IUserComicsRepository {
  create(data: ICreateUserCharactersDTO): Promise<UserCharacters[] | undefined>;
}
