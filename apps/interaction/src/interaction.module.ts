import { Module } from '@nestjs/common';
import { PostController } from './post/post.controller';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@friends-club/common';
import { ReactionEntityRepository } from './reaction/db/reaction-entity.repository';

import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { ReactionSchema } from './reaction/db/reaction.schema';

import { RmqModule } from '@friends-club/common';
import { ReactionController } from './reaction/reaction.controller';
import { ReactionSchemaFactory } from './reaction/db/reaction-schema.factory';
import { ReactionFactory } from './reaction/reaction.factory';
import { ReactionCommandHandlers } from './reaction/commands';
import { ReactionEventHandlers } from './reaction/events';
import { CqrsModule } from '@nestjs/cqrs';
import { ReactionQueryHandlers } from './reaction/queries';
import { ReactionDtoRepository } from './reaction/db/reaction-dto.repository';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_INTERACTION_QUEUE: Joi.string().required(),
        RABBIT_MQ_USER_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/interaction/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: ReactionSchema.name,
        schema: SchemaFactory.createForClass(ReactionSchema),
      },
    ]),
    RmqModule,
    CqrsModule,
  ],
  controllers: [PostController, ReactionController, UserController],
  providers: [
    ReactionEntityRepository,
    ReactionDtoRepository,
    ReactionSchemaFactory,
    ReactionFactory,
    ...ReactionCommandHandlers,
    ...ReactionEventHandlers,
    ...ReactionQueryHandlers,
  ],
})
export class InteractionModule {}
