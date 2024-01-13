import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from './services';

@Injectable()
export class UserService {
  constructor(@Inject(USER_SERVICE) private userClient: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  deleteUser(): void {
    this.userClient.emit('user.deleted', { userId: '234' });
  }
}
