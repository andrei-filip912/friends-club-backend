import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostCommand } from './commands/create-post/create-post.command';
import { CreatePostRequest } from './dto/create-post-request.dto';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { UpdatePostCaptionRequest } from './dto/update-post-caption-request.dto';
import { UpdateCaptionCommand } from './commands/update-caption/update-caption.command';
import { PostQuery } from './queries/post.query';
import { PostDto } from './dto/post.dto';
import { DeletePostRequest } from './dto/delete-post-request.dto';
import { DeletePostCommand } from './commands/delete-post/delete-post.command';
import { AuthRequest, AuthorizationGuard } from '@friends-club/common';

@Controller('post')
@UseGuards(AuthorizationGuard)
export class PostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getPosts(): Promise<PostDto[]> {
    return this.queryBus.execute<PostQuery, PostDto[]>(new PostQuery());
  }

  // @Get(':id')
  // async getPost(@Param('id') postId: number): Promise<void> {
  //   //return this.postService.getHello();
  // }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @UploadedFile() image: Express.Multer.File,
    @Body() createPostRequest: CreatePostRequest, // dto
    @Req() req: AuthRequest,
  ): Promise<PostDto> {
    createPostRequest.image = image;
    createPostRequest.userId = req.auth.sub;

    return this.commandBus.execute<CreatePostCommand, PostDto>(
      new CreatePostCommand(createPostRequest),
    );
  }

  @Patch(':id/caption')
  async updatedPostCaption(
    @Param('id') postId: number,
    @Body() updatePostCaptionRequest: UpdatePostCaptionRequest,
    @Req() req: AuthRequest,
  ): Promise<PostDto> {
    updatePostCaptionRequest.postId = postId;
    updatePostCaptionRequest.userId = req.auth.sub;

    return await this.commandBus.execute<UpdateCaptionCommand, PostDto>(
      new UpdateCaptionCommand(updatePostCaptionRequest),
    );
  }
  @Delete(':id')
  async deletePost(
    @Param('id') postId: number,
    @Body() deletePostRequest: DeletePostRequest,
    @Req() req: AuthRequest,
  ): Promise<void> {
    deletePostRequest.postId = postId;
    deletePostRequest.userId = req.auth.sub;

    return await this.commandBus.execute<DeletePostCommand, void>(
      new DeletePostCommand(deletePostRequest),
    );
  }
}
