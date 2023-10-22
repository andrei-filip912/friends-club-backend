import { AbstractDocument } from '@friends-club/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ReactionType } from '@friends-club/common/domain/enums/reaction-type.enum';

@Schema({ versionKey: false })
export class ReactionDocument extends AbstractDocument {
  @Prop()
  userId: string; // may change

  @Prop()
  postId: string; // may change

  @Prop({ type: String, enum: ReactionType })
  reactionType: ReactionType;
}

export const ReactionSchema = SchemaFactory.createForClass(ReactionDocument);
