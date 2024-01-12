import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReactionSchema } from './reaction.schema';
import { Model } from 'mongoose';
import { ReactionDto } from '../dto/reaction.dto';

@Injectable()
export class ReactionDtoRepository {
  constructor(
    @InjectModel(ReactionSchema.name)
    private readonly reactionModel: Model<ReactionSchema>,
  ) {}

  async findAll(): Promise<ReactionDto[]> {
    const reactions = await this.reactionModel.find({});
    return reactions.map((reaction) => {
      return {
        _id: reaction._id.toHexString(),
        userId: reaction.userId,
        postId: reaction.postId,
        reactionType: reaction.reactionType,
      };
    });
  }

  async findAllPerPost(postId: number): Promise<ReactionDto[]> {
    const reactions = await this.reactionModel.find({ postId: postId });
    return reactions.map((reaction) => {
      return {
        _id: reaction._id.toHexString(),
        userId: reaction.userId,
        postId: reaction.postId,
        reactionType: reaction.reactionType,
      };
    });
  }
}
