import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CreateMessageDto, GetChatDto, GetQueryDto } from './chat.dto';
import ChatService from './chat.service';
import AuthGuard from '@utils/auth.guard';
@Controller('chat')
@UseGuards(AuthGuard)
class ChatController {
  constructor(private readonly service: ChatService) {}

  @Get('/message/:uid')
  async getUserMessage(
    @Param() params: any,
    @Request() req: any,
  ): Promise<GetChatDto> {
    try {
      return await this.service.getUserMessage(req.users.userId, params.uid);
    } catch (error) {
      throw error;
    }
  }

  @Get('/message')
  async getAllMessage(@Query() querys: GetQueryDto): Promise<GetChatDto> {
    try {
      if (querys.messageId) {
        return await this.service.getMessageById(querys.messageId);
      }

      return await this.service.getAllMessage();
    } catch (error) {
      throw error;
    }
  }

  @Get('/all')
  async getAllChat(@Query() querys: GetQueryDto): Promise<GetChatDto> {
    try {
      if (querys.chatId) {
        return await this.service.getChatById(querys.chatId);
      }
      return await this.service.getAllChat();
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getUserChat(@Request() req: any): Promise<GetChatDto> {
    try {
      return await this.service.getUserChat(req.users.userId);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async createChat(@Body() body: CreateMessageDto): Promise<any> {
    try {
      return this.service.createChat(body);
    } catch (error) {
      throw error;
    }
  }
}

export default ChatController;
