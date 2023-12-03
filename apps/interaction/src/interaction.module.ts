import { Module } from '@nestjs/common';
import { PostController } from './post/post.controller';
import { InteractionService } from './domain/interaction.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@friends-club/common';
import { ReactionEntityRepository } from './interaction/db/reaction-entity.repository';

import { MongooseModule } from '@nestjs/mongoose';
import { ReactionSchema } from './interaction/db/reaction.schema';
import { Reaction } from './interaction/Reaction';

import { RmqModule } from '@friends-club/common';
import { ReactionController } from './interaction/reaction.controller';

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
      { name: Reaction.name, schema: ReactionSchema },
    ]),
    RmqModule,
  ],
  controllers: [PostController, ReactionController],
  providers: [InteractionService, ReactionEntityRepository],
})
export class InteractionModule {}
