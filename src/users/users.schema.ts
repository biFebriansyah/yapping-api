import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, autoIndex: false })
export class Users {
  @Prop({
    required: true,
    type: Types.ObjectId,
    unique: true,
    index: true,
    default: () => new Types.ObjectId(),
  })
  userId: string;

  @Prop({ required: true, type: String, unique: true })
  username: string;

  @Prop({ required: true, type: Number, unique: true })
  phone: number;

  @Prop({ required: true, type: String })
  password: string;
}

export type UserDocument = HydratedDocument<Users>;
export const UserSchema = SchemaFactory.createForClass(Users).set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});
