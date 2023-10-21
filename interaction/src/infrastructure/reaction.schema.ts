import { AbstractDocument } from "@friends-club/common";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { ReactionType } from "@friends-club/common";
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class ReactionDocument {
    @Prop()
    userId: string; // may change

    @Prop()
    postId: string; // may change

    // @Prop({ type: String, enum: ReactionType })
    // reactionType: ReactionType;
}

export const ReactionSchema = SchemaFactory.createForClass(ReactionDocument);