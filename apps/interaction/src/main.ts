import { NestFactory } from '@nestjs/core';
import { InteractionModule } from './infrastructure/interaction.module';
import { RmqService } from '@friends-club/common';

async function bootstrap() {
  const app = await NestFactory.create(InteractionModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('INTERACTIONS'));
  await app.startAllMicroservices();
}
bootstrap();
