import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
// import { RmqModule } from '@friends-club/common';
// import { USER_SERVICE } from './services';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_USER_QUEUE: Joi.string().required(),
        AUTH0_AUDIENCE: Joi.string().required(),
        AUTH0_DOMAIN: Joi.string().required(),
      }),
      envFilePath: './apps/user/.env.local',
    }),
    // RmqModule.register({ queueNames: [USER_SERVICE] }),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'user_exchange',
          type: 'fanout',
        },
      ],
      uri: 'amqps://ikuokxnz:d_ERuhAFJekJXii6EFriNQ6rPQpi5De4@whale.rmq.cloudamqp.com/ikuokxnz',
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
