import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type CadetDocument = HydratedDocument<Cadet>;

@Schema({ collection: 'cadets', timestamps: true })
export class Cadet {
  @Prop({ index: true, unique: true })
  identifier: string;

  @Prop()
  gender: string;

  @Prop()
  rank: string;

  @Prop()
  maritalStatus: string;

}

export const CadetSchema = SchemaFactory.createForClass(Cadet);
