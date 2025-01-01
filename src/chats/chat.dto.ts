class CreateMessageDto {
  readonly senderId: string;
  readonly receiverId: string;
  readonly message: string;
}

class CreateChatDto {
  readonly participants: any[];
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

export { CreateMessageDto, CreateChatDto, GetMessageDto, GetChatDto };
