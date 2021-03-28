import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Character from '@modules/characters/infra/typeorm/entities/Character';

@Entity('user_characters')
class UserCharacters {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => User, user => user.user_characters)
  @JoinColumn({ name: 'user_id' })
  @JoinTable({
    name: 'users',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  user: User;

  @ManyToOne(() => Character, character => character.user_characters)
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @Column({ select: true })
  character_id: string;

  @Column({ select: true })
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserCharacters;
