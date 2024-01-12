import { AuthorizationGuard, DatabaseModule } from '@friends-club/common';
import { CanActivate, INestApplication, Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect } from 'mongoose';
import { InteractionModule } from '../../src/interaction.module';
import { ReactionEntityRepository } from '../../src/reaction/db/reaction-entity.repository';
import { ReactionSchema } from '../../src/reaction/db/reaction.schema';

describe('Reaction service: interaction (Interaction)', () => {
  let app: INestApplication;
  let reactionEntityRepository: ReactionEntityRepository;
  let mongod: MongoMemoryServer;

  @Module({
    imports: [
      MongooseModule.forRootAsync({
        useFactory: async () => {
          mongod = await MongoMemoryServer.create();
          const mongoUri = mongod.getUri();
          return {
            uri: mongoUri,
            useCreateIndex: true,
          };
        },
      }),
      MongooseModule.forFeature([
        {
          name: ReactionSchema.name,
          schema: SchemaFactory.createForClass(ReactionSchema),
        },
      ]),
    ],
  })
  class MongoMockModule {}

  beforeEach(async () => {
    const mock_Guard: CanActivate = {
      canActivate: jest.fn(() => true),
    };
    // const moduleFixture: TestingModule = await Test.createTestingModule({
    //   imports: [InteractionModule],
    // })
    //   .overrideModule(DatabaseModule)
    //   .useModule(MongoMockModule)
    //   .overrideGuard(AuthorizationGuard)
    //   .useValue(mock_Guard)
    //   .compile();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [InteractionModule],
    })
      .overrideModule(DatabaseModule)
      .useModule(MongoMockModule)
      .overrideGuard(AuthorizationGuard)
      .useValue(mock_Guard)
      .compile();

    reactionEntityRepository = moduleFixture.get<ReactionEntityRepository>(
      ReactionEntityRepository,
    );

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    // closeInMongodConnection();
    await disconnect();
    if (mongod) await mongod.stop();
  });

  describe('test', () => {
    it('', () => {
      expect(1).toEqual(1);
    });
  });
});
