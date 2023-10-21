import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { File } from 'src/files/file.schema';

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

  @Prop()
  files: File[];
}

export const CadetSchema = SchemaFactory.createForClass(Cadet);
