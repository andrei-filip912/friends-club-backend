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
  await app.listen(8000);

  const rmqService = app.get<RmqService>(RmqService);
  await app.connectMicroservice(rmqService.getOptions('INTERACTION'));
  await app.connectMicroservice(rmqService.getOptions('USER_INTERACTION'));
  app.startAllMicroservices();
}
bootstrap();

// async function bootstrap() {
//   const app = await NestFactory.create(InteractionModule);
//   await app.listen(8000);
// }
// bootstrap();
