import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

interface Post {
  id: number;
  author: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): Post {
    return {
      id: 1,
      author: 'John Doe',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      likeCount: 0,
      commentCount: 0,
    };
  }
}
