import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CreateMessageDto, GetChatDto } from './chat.dto';
import ChatService from './chat.service';
import AuthGuard from '@utils/auth.guard';

@Controller('chat')
@UseGuards(AuthGuard)
class ChatController {
  constructor(private readonly service: ChatService) {}

  @Get('/all')
  async getAll(): Promise<GetChatDto> {
    try {
      return await this.service.getAllChats();
    } catch (error) {
      throw error;
    }
  }

  @Get('/message/all')
  async getAllMessage(): Promise<GetChatDto> {
    try {
      return await this.service.getAllMessage();
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getOne(@Request() req: any): Promise<GetChatDto> {
    try {
      return await this.service.getUserChat(req.users.userId);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async createOne(@Body() body: CreateMessageDto): Promise<any> {
    try {
      return this.service.createChat(body);
    } catch (error) {
      throw error;
    }
  }
}

export default ChatController;
