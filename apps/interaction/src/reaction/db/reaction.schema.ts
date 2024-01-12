import { AbstractSchema } from '@friends-club/common';
import { ReactionType } from '@friends-club/common';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ collection: 'reactions' })
export class ReactionSchema extends AbstractSchema {
  @Prop()
  readonly userId: string;

  @Prop()
  readonly postId: number;

  @Prop({ type: String, enum: ReactionType })
  readonly reactionType: ReactionType;
}
