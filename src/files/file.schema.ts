import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type FileDocument = HydratedDocument<File>;

@Schema({ collection: 'files', timestamps: true })
export class File {
  @Prop()
  cadetId: string;

  @Prop()
  data: Buffer;

  @Prop()
  contentType: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
