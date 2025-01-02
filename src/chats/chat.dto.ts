class CreateMessageDto {
  readonly senderId: string;
  readonly receiverId: string;
  readonly message: string;
}

class CreateStateDto {
  readonly senderId: string;
  readonly receiverId: string;
  readonly state: string;
}

class CreateChatDto {
  readonly senderId: string | any;
  readonly receiverId: string | any;
  readonly lastMessage: string;
  readonly messages: any;
}

class GetMessageDto {
  readonly senderId: string;
  readonly receiverId: string;
  readonly message: string;
  readonly timestamp: Date;
}

class GetChatDto {
  readonly participants: string[];
  readonly lastMessage: string;
  readonly messages: any;
}

class GetQueryDto {
  readonly messageId?: string;
  readonly chatId?: string;
}

export {
  CreateMessageDto,
  CreateChatDto,
  CreateStateDto,
  GetMessageDto,
  GetChatDto,
  GetQueryDto,
};
