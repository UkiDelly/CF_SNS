import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModel } from './entities/posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  // Repository를 사용하기 위해서는 TypeOrmModule.forFeature()를 사용하고 사용할 Model을 배열로 전달
  imports: [TypeOrmModule.forFeature([PostModel])],
  controllers: [PostsController],
  providers: [PostsService],

})
export class PostsModule {}
