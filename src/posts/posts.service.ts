import { Injectable, NotFoundException } from '@nestjs/common';

export { CreatePostDto, PostModel, UpdatePostDto };

interface PostModel {
  id: number;
  author: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

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
  private posts: PostModel[] = [
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
      content:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
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

  getPosts(): PostModel[] {
    return this.posts;
  }

  getPost(id: number): PostModel {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException("The post doesn't exist");
    }

    return post;
  }

  createPost(createPostDto: CreatePostDto): PostModel {
    const newPost: PostModel = {
      id: this.posts.length + 1,
      ...createPostDto,
      likeCount: 0,
      commentCount: 0,
    };

    this.posts.push(newPost);
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
