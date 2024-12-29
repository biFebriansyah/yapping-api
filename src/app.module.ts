import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoMod } from '@utils/mongo';
import UserModule from './users/users.module';
import ChatModule from './chats/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoMod.forRoot(),
    UserModule,
    ChatModule,
  ],
})
export class AppModule {}
