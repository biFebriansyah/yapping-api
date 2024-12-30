import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from './users.schema';
import { Profiles, ProfileSchemas } from '../profile/profile.schema';
import Controller from './users.controller';
import Service from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UserSchema },
      { name: Profiles.name, schema: ProfileSchemas },
    ]),
  ],
  controllers: [Controller],
  providers: [Service],
})
export default class UserModule {}
