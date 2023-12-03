import { Module } from '@nestjs/common';
import { PostController } from './post/post.controller';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@friends-club/common';
import { ReactionEntityRepository } from './interaction/db/reaction-entity.repository';

import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { ReactionSchema } from './interaction/db/reaction.schema';

import { RmqModule } from '@friends-club/common';
import { ReactionController } from './interaction/reaction.controller';
import { ReactionSchemaFactory } from './interaction/db/reaction-schema.factory';
import { ReactionFactory } from './interaction/reaction.factory';
import { ReactionCommandHandlers } from './interaction/commands';
import { ReactionEventHandlers } from './interaction/events';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_INTERACTION_QUEUE: Joi.string().required(),
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
  controllers: [PostController, ReactionController],
  providers: [
    ReactionEntityRepository,
    ReactionSchemaFactory,
    ReactionFactory,
    ...ReactionCommandHandlers,
    ...ReactionEventHandlers,
  ],
})
export class InteractionModule {}
