import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

interface Post {
  id: number;
  author: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Controller('posts')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Post {
    return {
      id: 1,
      author: 'John Doe',
      content: 'Hello World!',
      likeCount: 10,
      commentCount: 10
    };
  }
}

// nest g resourse
