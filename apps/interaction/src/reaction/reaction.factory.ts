import { EntityFactory, ReactionType } from '@friends-club/common';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ReactionEntityRepository } from '../reaction/db/reaction-entity.repository';
import { Reaction } from './Reaction';
import { ReactionCreatedEvent } from './events/reaction-created/reaction-create.event';

@Injectable()
export class ReactionFactory implements EntityFactory<Reaction> {
  constructor(private readonly reactionRepository: ReactionEntityRepository) {}

  async create(
    userId: string,
    postId: number,
    reactionType: ReactionType,
  ): Promise<Reaction> {
    const reaction = new Reaction(
      new Types.ObjectId().toHexString(),
      userId,
      postId,
      reactionType,
    );
    await this.reactionRepository.create(reaction);
    reaction.apply(new ReactionCreatedEvent(reaction.getId()));
    return reaction;
  }

  async createOrUpdate(
    userId: string,
    postId: number,
    reactionType: ReactionType,
  ): Promise<Reaction> {
    const reaction = new Reaction(
      new Types.ObjectId().toHexString(),
      userId,
      postId,
      reactionType,
    );

    const filterQuery = {
      userId: userId,
      postId: postId,
    };

    await this.reactionRepository.upsert(filterQuery, reaction);
    reaction.apply(new ReactionCreatedEvent(reaction.getId()));
    return reaction;
  }
}
