import { Module, DynamicModule } from '@nestjs/common';
import { RmqService } from './rmq.service';
import {
  ClientsModule,
  ClientsModuleAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

// to-do: to moved
interface RmqModuleOptions {
  // name: string;
  queueNames: string[];
}

@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register({ queueNames }: RmqModuleOptions): DynamicModule {
    const clientModuleOptions = queueNames.map((name: string) => ({
      name,
      useFactory: (configService: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [configService.get<string>('RABBIT_MQ_URI')!],
          queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`),
        },
      }),
      inject: [ConfigService],
    }));

    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync(
          clientModuleOptions as ClientsModuleAsyncOptions,
        ),
      ],
      exports: [ClientsModule],
    };
  }
}
