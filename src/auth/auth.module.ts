import { Module } from '@nestjs/common';
import Controller from './auth.controller';
import UserModule from '../users/users.module';

@Module({
  imports: [UserModule],
  controllers: [Controller],
})
export default class AuthModule {}
