import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CreateMessageDto, CreateStateDto } from './chat.dto';
import ChatService from './chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
class ChatGateway implements OnGatewayConnection {
  constructor(private readonly service: ChatService) {}

  @WebSocketServer()
  private server: Server;

  async handleConnection(socket: Socket) {
    try {
      const userId = socket.handshake.query.userId as string;
      if (userId) {
        socket.join(userId);
      }
      console.log(`connected clientId: ${socket.id}\nuserId: ${userId}`);
    } catch (error) {
      throw error;
    }
  }

  @SubscribeMessage('state')
  async handleStatus(@MessageBody() state: CreateStateDto) {
    try {
      this.server.to(state.receiverId).emit('state-receive', state);
    } catch (error) {
      throw error;
    }
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: CreateMessageDto) {
    try {
      await this.service.createChat(message);
      this.server.to(message.receiverId).emit('receive', message);
    } catch (error) {
      throw error;
    }
  }
}

export default ChatGateway;
