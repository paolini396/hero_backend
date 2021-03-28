import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import UserComics from '@modules/users/infra/typeorm/entities/UserComics';

@Entity('comics')
class Comic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  marvel_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @Column()
  extension: string;

  @OneToMany(() => UserComics, userComic => userComic.comic)
  @JoinColumn()
  user_comics: UserComics[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Comic;
