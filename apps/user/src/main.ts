import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
// import { RmqService } from '@friends-club/common';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'https://friends-club.dev:3000',
    // credentials: true,
  });
  // const rmqService = app.get<RmqService>(RmqService);
  // app.connectMicroservice(rmqService.getOptions('USER'));
  // await app.startAllMicroservices();
  await app.listen(8000);
}
bootstrap();
