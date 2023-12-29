import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostModel } from './entities/posts.entity';

export { CreatePostDto, UpdatePostDto };

interface CreatePostDto {
  author: string;
  content: string;
}

interface UpdatePostDto {
  author?: string;
  content?: string;
}

@Injectable()
export class PostsService {

  constructor(
    // NestJS에서 자동으로 생성한 Repository를 주입할때는 @InjectRepository()도 사용해야한다.
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>) {}

  private posts: PostModel[] = [];


  async getPosts() {
    return await this.postRepository.find({ take: 10 });
  }

  async getPost(id: number): Promise<PostModel> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException("The post doesn't exist");
    }

    return post;
  }

  async createPost(createPostDto: CreatePostDto) {
    // 새로운 PostModel 객체를 생성한다,
    const post = this.postRepository.create(createPostDto);

    // 생성한 PostModel 객체를 저장한다.
    const newPost = await this.postRepository.save(post);
    return newPost;
  }

  updatePost(id: number, updatePostDto: UpdatePostDto) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException("The post doesn't exist");
    }

    const updatedPost: PostModel = {
      id: post.id,
      author: updatePostDto.author || post.author,
      content: updatePostDto.content || post.content,
      likeCount: post.likeCount,
      commentCount: post.commentCount,
    };

    this.posts[id - 1] = updatedPost;
    return updatedPost;
  }

  deletePost(id: number) {
    const post = this.posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException("The post doesn't exist");
    }

    this.posts = this.posts.filter((post) => post.id !== id);
    return id;
  }
}
