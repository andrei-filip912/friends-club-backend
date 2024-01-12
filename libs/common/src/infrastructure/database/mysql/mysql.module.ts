import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: parseInt(configService.get<string>('MYSQL_PORT')!, 10),
        database: configService.get<string>('MYSQL_DATABASE'),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('MYSQL_SYNCHRONIZE') === 'true',
        // ssl: {
        //   ca: configService.get<string>('MYSQL_SSL_PATH'),
        // },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class SqlDatabaseModule {}
