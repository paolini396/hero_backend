import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import UserCharacters from '@modules/users/infra/typeorm/entities/UserCharacters';

@Entity('characters')
class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  marvel_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @Column()
  extension: string;

  @OneToMany(() => UserCharacters, userCharacter => userCharacter.character)
  @JoinColumn()
  user_characters: UserCharacters[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Character;
