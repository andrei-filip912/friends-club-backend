import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ collection: 'posts' })
export class PostSchema {
  @Prop()
  readonly _id: number;

  @Prop()
  readonly userId: string;
}
