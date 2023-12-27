import { Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
  id: number;
  author: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

const posts: PostModel[] = [
  {
    id: 1,
    author: 'John Doe',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    likeCount: 0,
    commentCount: 0,
  },
  {
    id: 2,
    author: 'Jane Smith',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
    likeCount: 5,
    commentCount: 2,
  },
  {
    id: 3,
    author: 'Alice Johnson',
    content: 'At vero eos et accusamus et iusto odio dignissimos ducimus.',
    likeCount: 10,
    commentCount: 3,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): PostModel[] {
    return posts;
  }

  @Get(':id')
  getPost(@Param('id') id: string): PostModel {
    return posts.find((post) => post.id === +id);
  }

  @Post()
  createPost(): PostModel | void {}
}
