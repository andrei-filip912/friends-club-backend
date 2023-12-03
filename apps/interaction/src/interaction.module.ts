import { Module } from '@nestjs/common';
import { PostController } from './post/post.controller';
import { InteractionService } from './domain/interaction.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@friends-club/common';
import { ReactionRepository } from './infrastructure/reaction.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ReactionDocument,
  ReactionSchema,
} from './infrastructure/reaction.schema';
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
      { name: ReactionDocument.name, schema: ReactionSchema },
    ]),
    RmqModule,
  ],
  controllers: [PostController, ReactionController],
  providers: [InteractionService, ReactionRepository],
})
export class InteractionModule {}
