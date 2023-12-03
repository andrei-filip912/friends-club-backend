import { NestFactory } from '@nestjs/core';
import { InteractionModule } from './interaction.module';
import { RmqService } from '@friends-club/common';

async function bootstrap() {
  const app = await NestFactory.create(InteractionModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('INTERACTION'));
  await app.startAllMicroservices();
}
bootstrap();

// async function bootstrap() {
//   const app = await NestFactory.create(InteractionModule);
//   await app.listen(3001);
// }
// bootstrap();
