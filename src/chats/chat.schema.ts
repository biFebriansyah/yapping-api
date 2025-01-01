import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Types, Document } from 'mongoose';

@Schema({ timestamps: true })
export class Messages extends Document {
  @Prop({ required: true, type: Types.ObjectId })
  senderId: string;

  @Prop({ required: true, type: Types.ObjectId })
  receiverId: string;

  @Prop({ required: true, type: String })
  message: string;

  @Prop({ type: Date, default: Date.now() })
  timestamp: Date;
}

@Schema({ timestamps: true })
export class Chats extends Document {
  @Prop({ required: true, type: [{ type: Types.ObjectId }] })
  participants: string[] | Types.ObjectId;

  @Prop({ required: true, type: String })
  lastMessage: string;

  @Prop({ required: true, type: String, ref: Messages.name })
  messages: Messages | Types.ObjectId;
}

export type MessageDocument = HydratedDocument<Messages>;
export const MessageSchemas = SchemaFactory.createForClass(Messages);
export type ChatDocument = HydratedDocument<Chats>;
export const ChatSchemas = SchemaFactory.createForClass(Chats);
