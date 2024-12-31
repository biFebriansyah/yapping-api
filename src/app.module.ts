import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { mongoModules } from './modules/mongo';
import { JwtModules } from './modules/jwt';
import UserModule from './users/users.module';
import AuthModule from './auth/auth.module';
import ProfileModule from './profile/profile.module';
import ChatModule from './chats/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    mongoModules.forRoot(),
    JwtModules.forRoot(),
    UserModule,
    AuthModule,
    ProfileModule,
    ChatModule,
  ],
})
export class AppModule {}
