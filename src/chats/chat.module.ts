import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Messages, Chats, MessageSchemas, ChatSchemas } from './chat.schema';
import ChatService from './chat.service';
import ChatController from './chat.controller';
import ChatGateway from './chat.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Messages.name, schema: MessageSchemas },
      { name: Chats.name, schema: ChatSchemas },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
export default class ChatModule {}
