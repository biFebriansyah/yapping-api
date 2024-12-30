import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profiles, ProfileSchemas } from './profile.schema';
import Controller from './profile.controller';
import Service from './profile.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profiles.name, schema: ProfileSchemas },
    ]),
  ],
  controllers: [Controller],
  providers: [Service],
})
export default class ProfileModule {}
