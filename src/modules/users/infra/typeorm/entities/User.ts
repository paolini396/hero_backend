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

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
