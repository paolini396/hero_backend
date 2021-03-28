import User from '@modules/users/infra/typeorm/entities/User';

interface ICharacter {
  id: string;
  name?: string;
}

export default interface ICreateUserCharactersDTO {
  user: User;
  user_characters: ICharacter[];
}
