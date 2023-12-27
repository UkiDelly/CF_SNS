import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('posts')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}

// nest g resourse
