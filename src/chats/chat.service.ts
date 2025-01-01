import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, ClientSession, Types } from 'mongoose';
import { Messages, Chats } from './chat.schema';
import { CreateChatDto, CreateMessageDto } from './chat.dto';

@Injectable()
class ChatService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Messages.name) private messageModel: Model<Messages>,
    @InjectModel(Chats.name) private chatModel: Model<Chats>,
  ) {}

  async getAllChats(): Promise<any> {
    try {
      const data = await this.chatModel.find().exec();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAllMessage(): Promise<any> {
    try {
      return await this.messageModel.find().exec();
    } catch (error) {
      throw error;
    }
  }

  async getUserMessage(senderId: string, receiverId: string): Promise<any> {
    try {
      return await this.messageModel
        .find({
          $or: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        })
        .exec();
    } catch (error) {
      throw error;
    }
  }

  async getAllUserChat(usersId: string): Promise<any> {
    try {
      const objectId = new Types.ObjectId(usersId);
      return await this.chatModel
        .find({ participants: objectId })
        .sort({ updatedAt: -1 })
        .exec();
    } catch (error) {
      throw error;
    }
  }

  async isChatExist(participants: any): Promise<any> {
    try {
      const chats = await this.chatModel
        .findOne({ participants: { $all: participants } })
        .exec();

      return chats?._id || null;
    } catch (error) {
      throw error;
    }
  }

  async createChat(data: CreateMessageDto): Promise<any> {
    let session: ClientSession;
    try {
      session = await this.connection.startSession();
      session.startTransaction();
      let chatId: any;

      const { _id: messageId } = await new this.messageModel({
        ...data,
      }).save({
        session,
      });

      const chatData: CreateChatDto = {
        participants: [
          new Types.ObjectId(data.senderId),
          new Types.ObjectId(data.receiverId),
        ],
        lastMessage: data.message,
        messages: messageId,
      };

      chatId = await this.isChatExist(chatData.participants);
      if (Boolean(chatId)) {
        await this.chatModel
          .updateOne(
            { _id: chatId },
            { lastMessage: data.message, messages: messageId },
            { session },
          )
          .exec();
      } else {
        const chats = await new this.chatModel({ ...chatData }).save({
          session,
        });
        chatId = chats._id;
      }

      await session.commitTransaction();
      return { messageId, chatId };
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default ChatService;
