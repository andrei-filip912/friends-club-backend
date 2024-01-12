import { Module } from '@nestjs/common';
import { PostController } from '../application/post.controller';
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
import { PostQueryHandlers } from '../application/queries';
import { PostDtoRepository } from './post-dto.repository';
import { PostDto } from '../application/dto/post.dto';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from '../application/health.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_INTERACTION_QUEUE: Joi.string().required(),
        RABBIT_MQ_POST_IMAGE_ADDED_QUEUE: Joi.string().required(),
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.string().required(),
        MYSQL_DATABASE: Joi.string().required(),
        MYSQL_USERNAME: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().allow(''),
        MYSQL_SYNCHRONIZE: Joi.bool().required(),
        MYSQL_SSL_PATH: Joi.string().required(),
        AUTH0_AUDIENCE: Joi.string().required(),
        AUTH0_DOMAIN: Joi.string().required(),
      }),
      envFilePath: './apps/post/.env',
    }),
    RmqModule.register({ queueNames: [INTERACTION_SERVICE, UPLOAD_SERVICE] }),
    CqrsModule,
    TypeOrmModule.forFeature([PostDbEntity, PostDto]),
    SqlDatabaseModule,
    TerminusModule,
    HttpModule
  ],
  controllers: [PostController, HealthController],
  providers: [
    PostRepository,
    PostDbEntity,
    PostFactory,
    PostDbEntityFactory,
    PostDtoRepository,
    ...PostCommandHandlers,
    ...PostEventHandlers,
    ...PostQueryHandlers,
  ],
})
export class PostModule {}
