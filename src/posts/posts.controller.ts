import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
  id: number;
  author: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
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

interface CreatePostDto {
  author: string;
  content: string;
}

interface UpdatePostDto {
  author?: string;
  content?: string;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * 모든 Post를 조회하는 API
   */
  @Get()
  getPosts(): PostModel[] {
    return posts;
  }

  /**
   * 특정 게시물을 가져옵니다.
   * @param id 게시물의 ID
   * @returns 해당 ID에 해당하는 게시물 객체
   * @throws NotFoundException 해당 ID에 해당하는 게시물이 없을 경우 발생합니다.
   */
  @Get(':id')
  getPost(@Param('id') id: string): PostModel {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      throw new NotFoundException("The post doesn't exist");
    }

    return post;
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): PostModel {
    const newPost: PostModel = {
      id: posts.length + 1,
      ...createPostDto,
      likeCount: 0,
      commentCount: 0,
    };

    posts.push(newPost);
    return newPost;
  }

  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const post = posts.find((post) => post.id === +id);
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

    posts[+id - 1] = updatedPost;
    return updatedPost;
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException("The post doesn't exist");
    }

    posts = posts.filter((posts) => posts.id !== +id);

    return id;
  }
}
