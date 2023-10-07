import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  identifier: string;

  @Prop()
  password: string;

  @Prop()
  role: string;

  @Prop({ default: false })
  accept_terms_and_conditions: boolean;

  @Prop({ default: now() })
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
