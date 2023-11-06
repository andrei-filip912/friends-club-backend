import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class InteractionService {
  private readonly logger = new Logger(InteractionService.name);

  getHello(): string {
    return 'Hello World!';
  }

  createPost(data: any) {
    console.log('post_created: ', data);
  }

  deletePost(data: any) {
    console.log('post_deleted: ', data);
  }
}
