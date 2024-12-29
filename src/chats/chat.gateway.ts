import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: { origin: '*' } })
class ChatGateway {
  @SubscribeMessage('message')
  async chatManage(@MessageBody() data: string): Promise<string> {
    try {
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default ChatGateway;
