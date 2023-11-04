import { Module } from '@nestjs/common';
import { PostController } from '../application/post.controller';
import { PostService } from '../domain/services/post.service';
import { RmqModule } from '@friends-club/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import {
  INTERACTION_SERVICE,
  UPLOAD_SERVICE,
} from '../domain/constants/services';
import { CqrsModule } from '@nestjs/cqrs';
import { PostRepository } from './post.db-entity.repository';
import { PostDbEntity } from './post.db-entity';
import { PostFactory } from '../domain/entities/post.factory';
import { PostCommandHandlers } from '../application/commands';
import { PostEventHandlers } from '../application/events';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqlDatabaseModule } from '@friends-club/common';
import { PostDbEntityFactory } from './post.db-entity.factory';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_INTERACTION_QUEUE: Joi.string().required(),
        RABBIT_MQ_POST_IMAGE_ADDED_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/post/.env',
    }),
    RmqModule.register({ queueNames: [INTERACTION_SERVICE, UPLOAD_SERVICE] }),
    CqrsModule,
    TypeOrmModule.forFeature([PostDbEntity]),
    SqlDatabaseModule,
  ],
  controllers: [PostController],
  providers: [
    PostService,
    PostRepository,
    PostDbEntity,
    PostFactory,
    PostDbEntityFactory,
    ...PostCommandHandlers,
    ...PostEventHandlers,
  ],
})
export class PostModule {}
