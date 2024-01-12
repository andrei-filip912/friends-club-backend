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
    reactionModel: Model<ReactionSchema>,
    reactionSchemaFactory: ReactionSchemaFactory,
  ) {
    super(reactionModel, reactionSchemaFactory);
  }
}
