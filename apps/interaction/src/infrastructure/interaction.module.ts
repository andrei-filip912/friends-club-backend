import { Module } from '@nestjs/common';
import { InteractionController } from '../application/interaction.controller';
import { InteractionService } from '../domain/interaction.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@friends-club/common';
import { ReactionRepository } from './reaction.repository';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
      envFilePath: './apps/interaction/.env'
    }),
    DatabaseModule,
    MongooseModule
  ],
  controllers: [InteractionController],
  providers: [InteractionService, ReactionRepository],
})
export class InteractionModule {}
