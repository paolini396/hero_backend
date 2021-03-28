import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';

import UserComics from './UserComics';
import UserCharacters from './UserCharacters';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => UserComics, userComics => userComics.user, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'user_comics',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'comic_id' }],
  })
  user_comics: UserComics[];

  @OneToMany(() => UserCharacters, userCharacters => userCharacters.user, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'user_characters',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'character_id' }],
  })
  user_characters: UserCharacters[];

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
