import { AbstractRepository } from '@friends-club/common';
import { Injectable } from '@nestjs/common';
import { Reaction } from '../Reaction';
import { ReactionSchema } from './reaction.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ReactionSchemaFactory } from './reaction-schema.factory';
import { Model } from 'mongoose';

@Injectable()
export class ReactionEntityRepository extends AbstractRepository<
  ReactionSchema,
  Reaction
> {
  constructor(
    @InjectModel(ReactionSchema.name)
    public reactionModel: Model<ReactionSchema>,
    public reactionSchemaFactory: ReactionSchemaFactory,
  ) {
    super(reactionModel, reactionSchemaFactory);
  }

  async deleteUserReactions(userId: string): Promise<void> {
    await this.reactionModel.deleteMany({ userId: userId }).exec();
  }
}
