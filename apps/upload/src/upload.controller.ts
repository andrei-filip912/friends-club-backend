import { Controller, Get } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { RmqContext } from '@nestjs/microservices';
import { RmqService } from '@friends-club/common';

@Controller()
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.uploadService.getHello();
  }
  @EventPattern('post.image.added')
  async handlePostImageAdded(@Payload() data: any, @Ctx() context: RmqContext) {
    this.uploadService.uploadPostImage(data);
    this.rmqService.ack(context);
  }
}
