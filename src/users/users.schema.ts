import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ index: true, unique: true })
  identifier: string;

  @Prop()
  password: string;

  @Prop()
  role: string;

  @Prop({ default: false })
  acceptTermsAndConditions: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);
