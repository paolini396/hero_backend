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
import Comic from '@modules/comics/infra/typeorm/entities/Comic';

@Entity('user_comics')
class UserComics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => User, user => user.user_comics)
  @JoinColumn({ name: 'user_id' })
  @JoinTable({
    name: 'users',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  user: User;

  @ManyToOne(() => Comic, comic => comic.user_comics)
  @JoinColumn({ name: 'comic_id' })
  comic: Comic;

  @Column({ select: true })
  comic_id: string;

  @Column({ select: true })
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserComics;
