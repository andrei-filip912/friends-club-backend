import { Module } from '@nestjs/common';
import { PostController } from '../application/post.controller';
import { PostService } from '../domain/services/post.service';
import { RmqModule } from '@friends-club/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { INTERACTION_SERVICE } from '../domain/constants/services';
import { CqrsModule } from '@nestjs/cqrs';
import { PostRepository } from './post.db-entity.repository';
import { PostDbEntity } from './post.db-entity';
import { PostFactory } from '../domain/entities/post.factory';
import { PostCommandHandlers } from '../application/commands';
import { PostEventHandlers } from '../domain/events';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    CqrsModule,
    TypeOrmModule.forFeature([PostDbEntity]),
    // add mongoose module fro MySql
  ],
  controllers: [PostController],
  providers: [
    PostService,
    PostRepository,
    // {
    //   provide: 'PostRepositoryInterface',
    //   useClass: PostRepository
    // }
    PostDbEntity,
    PostFactory,
    ...PostCommandHandlers,
    ...PostEventHandlers,
  ],
})
export class PostModule {}
