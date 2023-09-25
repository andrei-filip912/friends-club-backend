import { Module } from '@nestjs/common';
import { InteractionController } from '../application/interaction.controller';
import { InteractionService } from '../domain/interaction.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@friends-club/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
      envFilePath: './apps/interaction/.env'
    }),
    DatabaseModule
  ],
  controllers: [InteractionController],
  providers: [InteractionService],
})
export class InteractionModule {}
