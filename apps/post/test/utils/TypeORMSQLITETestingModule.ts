import { TypeOrmModule } from '@nestjs/typeorm';
import { PostDbEntity } from '../../src/infrastructure/post.db-entity';
import { PostDto } from '../../src/application/dto/post.dto';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [PostDbEntity, PostDto],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PostDbEntity, PostDto]),
  ],
})
export class SqlMockModule {}
