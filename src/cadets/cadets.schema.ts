import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type CadetDocument = HydratedDocument<Cadet>;

@Schema()
export class Cadet {
  @Prop()
  identifier: string;

  @Prop()
  gender: string;

  @Prop()
  rank: string;

  @Prop()
  marital_status: string;

  @Prop({ default: now() })
  created_at: Date;
}

export const CadetSchema = SchemaFactory.createForClass(Cadet);
