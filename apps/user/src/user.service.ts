import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_POST_SERVICE, USER_INTERACTION_SERVICE } from './services';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_POST_SERVICE) private userClient: ClientProxy,
    @Inject(USER_INTERACTION_SERVICE) private interactionClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  deleteUser(): void {
    // to be replace with emitting a single event using fanout type exchange
    this.userClient.emit('user.deleted', { userId: '234' });
    this.interactionClient.emit('user.deleted', { userId: '-69' });
  }
}
