import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Types, Document } from 'mongoose';
import { Profiles } from '../profile/profile.schema';

@Schema({ timestamps: true, autoIndex: false })
export class Users extends Document {
  @Prop({ required: true, type: String, unique: true })
  username: string;

  @Prop({ required: true, type: Number, unique: true })
  phone: number;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: Profiles.name,
    unique: true,
  })
  profile: Profiles | Types.ObjectId;
}

export type UserDocument = HydratedDocument<Users>;
export const UserSchema = SchemaFactory.createForClass(Users).set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
  },
});
