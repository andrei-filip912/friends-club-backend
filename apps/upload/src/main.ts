import { NestFactory } from '@nestjs/core';
import { UploadModule } from './upload.module';
import { RmqService } from '@friends-club/common';

async function bootstrap() {
  const app = await NestFactory.create(UploadModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('POST_IMAGE_ADDED'));
  await app.startAllMicroservices();
  // await app.listen(8002);
}
bootstrap();
