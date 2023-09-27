import { IAbstractDocument } from '@friends-club/common/domain/Interfaces/mongodb.interface.schema';
import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class AbstractDocument implements IAbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}