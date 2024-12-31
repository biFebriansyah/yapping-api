import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Types, Document } from 'mongoose';

@Schema({ timestamps: true, autoIndex: false })
export class Profiles extends Document {
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
