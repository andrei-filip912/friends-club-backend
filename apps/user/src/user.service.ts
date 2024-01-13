import { Inject, Injectable } from '@nestjs/common';
import { USER_SERVICE } from './services';
import { ClientProxy } from '@nestjs/microservices';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class UserService {
  //constructor(@Inject(USER_SERVICE) private userClient: ClientProxy) {}
  constructor(private readonly amqpConnection: AmqpConnection) {}
  getHello(): string {
    return 'Hello World!';
  }
  deleteUser(): void {
    //   this.userClient.emit('user.deleted', { id: '1234' });
    this.amqpConnection.publish('user_exchange', 'user.deleted', 'asdsf');
  }
}
