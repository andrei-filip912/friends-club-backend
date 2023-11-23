import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST') || 'test',
        port: parseInt(configService.get<string>('MYSQL_PORT')!, 10) || 1234,
        database: configService.get<string>('MYSQL_DATABASE') || 'test',
        username: configService.get<string>('MYSQL_USERNAME') || 'test',
        password: configService.get<string>('MYSQL_PASSWORD') || 'test',
        autoLoadEntities: true,
        synchronize: configService.get<string>('MYSQL_SYNCHRONIZE') === 'true',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class SqlDatabaseModule {}
