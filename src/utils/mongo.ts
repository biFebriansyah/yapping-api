import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({})
export class MongoMod {
  static forRoot(): DynamicModule {
    return {
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/develop', {
          user: process.env.MONGODB_USER,
          pass: process.env.MONGODB_PASS,
          authSource: 'admin',
          replicaSet: 'mongors',
          directConnection: true,
        }),
      ],
      module: MongoMod,
    };
  }
}
