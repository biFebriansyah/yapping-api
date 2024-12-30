import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as mongoSchema } from 'mongoose';
import { Users } from '../users/users.schema';

@Schema({ timestamps: true, autoIndex: false })
export class Profiles {
  @Prop({
    required: true,
    type: Types.ObjectId,
    unique: true,
    index: true,
    default: () => new Types.ObjectId(),
  })
  profileId: string;

  @Prop({ required: true, type: Types.ObjectId })
  userId: string;

  @Prop({ required: true, type: String })
  fullName: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  picture: string;

  @Prop({ type: String })
  address: string;

  @Prop({ required: true, type: mongoSchema.Types.ObjectId, ref: Users.name })
  users: { type: Types.ObjectId; ref: 'Users' };
}

export type ProfileDocument = HydratedDocument<Profiles>;
export const ProfileSchemas = SchemaFactory.createForClass(Profiles).set(
  'toJSON',
  {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
    },
  },
);
