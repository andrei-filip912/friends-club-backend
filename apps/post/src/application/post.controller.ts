import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { PostService } from '../domain/services/post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(): Promise<void> {
    //return this.postService.getHello();
  }

  @Get(':id')
  async getPost(@Param('id') postId: number): Promise<void> {
    //return this.postService.getHello();
  }

  @Post()
  async createPost(
    @Body() createPostRequest: CreatePostRequest
  ): Promise<void> {
    //return this.postService.createPost();
  }

  @Patch(':id')
  async updatedPostText(
    @Param('id') postId: number,
    @Body() updatePostTextRequest: UpdatePostTextRequest
  ): Promise<void> {}
}
