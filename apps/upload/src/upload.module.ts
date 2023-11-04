import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { RmqModule } from '@friends-club/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_POST_IMAGE_ADDED_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/upload/.env',
    }),
    RmqModule,
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
