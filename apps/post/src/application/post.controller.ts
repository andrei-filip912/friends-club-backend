import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePostCommand } from './commands/create-post/create-post.command';
import { CreatePostRequest } from './dto/create-post-request.dto';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { UpdatePostCaptionRequest } from './dto/update-post-caption-request.dto';
import { UpdateCaptionCommand } from './commands/update-caption/update-caption.command';

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

  @Patch(':id')
  async updatedPostCaption(
    @Param('id') postId: number,
    @Body() updatePostCaptionRequest: UpdatePostCaptionRequest,
  ): Promise<void> {
    updatePostCaptionRequest.postId = postId;
    await this.commandBus.execute<UpdateCaptionCommand, void>(
      new UpdateCaptionCommand(updatePostCaptionRequest),
    );
  }
}
