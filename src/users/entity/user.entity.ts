import { PostEntity } from 'src/posts/entities/posts.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum Role { ADMIN = 'admin', USER = 'user' }


@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  nickname: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role

  @OneToMany(ref => PostEntity, post => post.author)
  posts: PostEntity[];
}