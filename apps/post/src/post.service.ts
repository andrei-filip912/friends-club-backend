import { Injectable, Inject } from '@nestjs/common';
import { INTERACTION_SERVICE } from './services';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PostService {
  constructor(
    // private readonly postRepository: PostRepository
    @Inject(INTERACTION_SERVICE) private interactionClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createPost() {
    //request: CreatePostRequest
    this.interactionClient.emit('post_created', { message: 'post created' });
    // return this.postRepository.create(request);
  }
}
