import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreatePostDto,
  PostModel,
  PostsService,
  UpdatePostDto,
} from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * 모든 Post를 조회하는 API
   */
  @Get()
  getPosts(): PostModel[] {
    return this.postsService.getPosts();
  }

  /**
   * 특정 게시물을 가져옵니다.
   * @param id 게시물의 ID
   * @returns 해당 ID에 해당하는 게시물 객체
   * @throws NotFoundException 해당 ID에 해당하는 게시물이 없을 경우 발생합니다.
   */
  @Get(':id')
  getPost(@Param('id') id: string): PostModel {
    return this.postsService.getPost(+id);
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): PostModel {
    return this.postsService.createPost(createPostDto);
  }

  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(+id, updatePostDto);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(+id);
  }
}
