import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RmqModule } from '@friends-club/common';
import { USER_INTERACTION_SERVICE, USER_POST_SERVICE } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_USER_POST_QUEUE: Joi.string().required(),
        RABBIT_MQ_USER_INTERACTION_QUEUE: Joi.string().required(),
        AUTH0_AUDIENCE: Joi.string().required(),
        AUTH0_DOMAIN: Joi.string().required(),
      }),
      envFilePath: './apps/user/.env.local',
    }),
    RmqModule.register({
      queueNames: [USER_INTERACTION_SERVICE, USER_POST_SERVICE],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
