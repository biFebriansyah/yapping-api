import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Users {
  @Prop({ required: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;
}

export type UserDocument = HydratedDocument<Users>;
export const UserSchema = SchemaFactory.createForClass(Users);
