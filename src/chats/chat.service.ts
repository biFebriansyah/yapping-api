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

  async getAllMessage(): Promise<any> {
    try {
      return await this.messageModel.find().sort({ updatedAt: -1 }).exec();
    } catch (error) {
      throw error;
    }
  }

  async getMessageById(id: string): Promise<any> {
    try {
      return await this.messageModel
        .findOne({ _id: new Types.ObjectId(id) })
        .sort({ updatedAt: 1 })
        .exec();
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

  async getAllChat(): Promise<any> {
    try {
      const data = await this.chatModel.find().exec();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getChatById(id: string): Promise<any> {
    try {
      const data = await this.chatModel
        .findOne({ _id: new Types.ObjectId(id) })
        .exec();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUserChat(usersId: string): Promise<any> {
    try {
      const objectId = new Types.ObjectId(usersId);
      return await this.chatModel
        .find({
          $or: [{ senderId: objectId }, { receiverId: objectId }],
        })
        .populate({
          path: 'senderId',
          select: '-password',
          populate: { path: 'profile', model: 'Profiles' },
        })
        .populate({
          path: 'receiverId',
          select: '-password',
          populate: { path: 'profile', model: 'Profiles' },
        })
        .sort({ updatedAt: -1 })
        .exec();
    } catch (error) {
      throw error;
    }
  }

  async isChatExist(senderId: any, receiverId: any): Promise<any> {
    try {
      const chats = await this.chatModel
        .findOne({
          $or: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        })
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
        senderId: new Types.ObjectId(data.senderId),
        receiverId: new Types.ObjectId(data.receiverId),
        lastMessage: data.message,
        messages: messageId,
      };

      chatId = await this.isChatExist(chatData.senderId, chatData.receiverId);
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
