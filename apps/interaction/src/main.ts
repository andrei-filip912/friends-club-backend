import { NestFactory } from '@nestjs/core';
import { InteractionModule } from './interaction.module';
import { RmqService } from '@friends-club/common';

async function bootstrap() {
  const app = await NestFactory.create(InteractionModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'https://friends-club.dev:3000',
    // credentials: true,
  });
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('INTERACTION'));
  await app.startAllMicroservices();
  await app.listen(8000);
}
bootstrap();

// async function bootstrap() {
//   const app = await NestFactory.create(InteractionModule);
//   await app.listen(8000);
// }
// bootstrap();
