import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

interface MessageData {
  value: string;
  to?: string;
  seender: boolean;
}

@WebSocketGateway({ cors: { origin: '*' } })
class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  async handleConnection(socket: Socket) {
    try {
      console.log(`connected clientId: ${socket.id}`);
    } catch (error) {
      throw error;
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() msg: MessageData,
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      if (!msg.to) {
        socket.broadcast.emit('receive-msg', msg.value);
      } else {
        this.server.to(msg.to).emit('receive-msg', msg.value);
      }
    } catch (error) {
      throw error;
    }
  }
}

export default ChatGateway;
