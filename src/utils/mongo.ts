import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({})
export class MongoMod {
  static forRoot(): DynamicModule {
    return {
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/youapp', {
          user: process.env.MONGODB_USER,
          pass: process.env.MONGODB_PASS,
          authSource: 'admin',
        }),
      ],
      module: MongoMod,
    };
  }
}
