import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_POST_SERVICE, USER_INTERACTION_SERVICE } from '../services';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_POST_SERVICE) private userClient: ClientProxy,
    @Inject(USER_INTERACTION_SERVICE) private interactionClient: ClientProxy,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const baseUrl = this.configService.get<string>('AUTH0_DOMAIN');

      // get bearer token for management API
      const { data } = await this.httpService.axiosRef.post(
        baseUrl + 'oauth/token',
        {
          client_id: this.configService.get<string>('CLIENT_ID'),
          grant_type: this.configService.get<string>('GRANT_TYPE'),
          client_secret: this.configService.get<string>('CLIENT_SECRET'),
          audience: this.configService.get<string>('AUDIENCE'),
        },
      );
      console.log(data.access_token);

      // delete user info
      const res = await this.httpService.axiosRef.delete(
        `${baseUrl}api/v2/users/${id}`,
        {
          headers: {
            Authorization: 'Bearer ' + data.access_token,
          },
        },
      );
      console.log(res);

      // emit events
      // to be replace with emitting a single event using fanout type exchange
      this.userClient.emit('user.deleted', { id: id });
      this.interactionClient.emit('user.deleted', { id: id });
    } catch (error) {
      console.log(error);
    }
  }
}
