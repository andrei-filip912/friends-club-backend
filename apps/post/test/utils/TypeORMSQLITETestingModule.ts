import { TypeOrmModule } from '@nestjs/typeorm';
import { PostDbEntity } from '../../src/infrastructure/post.db-entity';
import { PostDto } from '../../src/application/dto/post.dto';

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [PostDbEntity, PostDto],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([PostDbEntity, PostDto]),
];
