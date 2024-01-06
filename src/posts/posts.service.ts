import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/posts.entity';

export { CreatePostDto, UpdatePostDto };

interface CreatePostDto {
  author: number;
  content: string;
}

interface UpdatePostDto {
  content?: string;
}

@Injectable()
export class PostsService {
  constructor(
    // NestJS에서 자동으로 생성한 Repository를 주입할때는 @InjectRepository()도 사용해야한다.
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) {}

  private posts: PostEntity[] = [];

  async getPosts() {
    return await this.postRepository.find({
      take: 10,
      relations: { author: true },
    });
  }

  async getPost(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException("The post doesn't exist");
    }

    return post;
  }

  async createPost(content: string, authorId: number) {
    // 새로운 PostEntity 객체를 생성한다,
    // 이때 author는 authorId를 통해 UserEntity 객체를 참조한다.
    const post = this.postRepository.create({
      content,
      author: { id: authorId },
    });

    // 생성한 PostEntity 객체를 저장한다.
    // .save()함수는 객체가 존재하면 업데이트를 하고, 존재하지 않으면 새로운 객체를 생성한다.
    const newPost = await this.postRepository.save(post);
    return newPost;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException("The post doesn't exist");
    }

    const updatedPost: PostEntity = {
      ...post,
      ...updatePostDto,
    };

    await this.postRepository.update(updatedPost.id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: number) {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) {
      throw new NotFoundException("The post doesn't exist");
    }

    await this.postRepository.delete(id);
    return id;
  }
}
