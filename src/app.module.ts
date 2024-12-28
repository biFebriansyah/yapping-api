import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoMod } from '@utils/mongo';
import UserModule from './modules/v1/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoMod.forRoot(),
    UserModule,
  ],
})
export class AppModule {}
