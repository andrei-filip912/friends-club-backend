import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePostCommand } from './commands/create-post.command';
import { CreatePostRequest } from './dto/create-post-request.dto';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Bind } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common';

@Controller('post')
export class PostController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get('/test')
  getTest(): string {
    return 'test';
    //return this.postService.getHello();
  }

  @Get()
  async getPosts(): Promise<void> {
    //return this.postService.getHello();
  }

  @Get(':id')
  async getPost(@Param('id') postId: number): Promise<void> {
    //return this.postService.getHello();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @UploadedFile() image: Express.Multer.File,
    @Body() createPostRequest: CreatePostRequest, // dto
  ): Promise<void> {
    createPostRequest.image = image;
    await this.commandBus.execute<CreatePostCommand, void>(
      new CreatePostCommand(createPostRequest),
    );
  }

  // @Patch(':id')
  // async updatedPostText(
  //   @Param('id') postId: number,
  //   @Body() updatePostTextRequest: UpdatePostTextRequest
  // ): Promise<void> {}
}
