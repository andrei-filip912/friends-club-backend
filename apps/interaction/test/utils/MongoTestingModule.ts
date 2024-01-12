import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect } from 'mongoose';
import { ReactionSchema } from '../../src/reaction/db/reaction.schema';

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
export class MongoMockModule {}

export const closeInMongodConnection = async () => {
  await disconnect();
  if (mongod) await mongod.stop();
};
