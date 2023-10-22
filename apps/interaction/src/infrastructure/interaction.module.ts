import { Module } from '@nestjs/common';
import { InteractionController } from '../application/interaction.controller';
import { InteractionService } from '../domain/interaction.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@friends-club/common';
import { ReactionRepository } from './reaction.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ReactionDocument, ReactionSchema } from './reaction.schema';
import { RmqModule } from '@friends-club/common';

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
  controllers: [InteractionController],
  providers: [InteractionService, ReactionRepository],
})
export class InteractionModule {}
