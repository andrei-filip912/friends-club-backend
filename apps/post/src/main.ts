import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { PostModule } from './post.module';

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(PostModule, {
//       transport: Transport.RMQ,
//       options: {
//         urls: ['amqp://localhost:5672'],
//         queue: 'post_queue',
//         queueOptions: {
//           durable: false
//         },
//       },
//     },
//   );
//   await app.listen();
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(PostModule);
  await app.listen(3000);
}
bootstrap();