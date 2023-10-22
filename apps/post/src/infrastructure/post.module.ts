import { Module } from '@nestjs/common';
import { PostController } from '../application/post.controller';
import { PostService } from '../domain/services/post.service';
import { RmqModule } from '@friends-club/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { INTERACTION_SERVICE } from '../domain/constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_INTERACTION_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/post/.env',
    }),
    RmqModule.register({
      name: INTERACTION_SERVICE,
    }),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
