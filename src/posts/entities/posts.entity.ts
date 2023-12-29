import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'posts' })
class PostModel {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 100 })
  author: string;

  @Column()
  content: string;

  @Column({ name: 'like_count' })
  likeCount: number;

  @Column({ name: 'comment_count' })
  commentCount: number;
}

export { PostModel };








