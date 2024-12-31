import { Module, DynamicModule } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

@Module({})
export class multerModules {
  static register(): DynamicModule {
    return {
      imports: [MulterModule.register({ dest: './upload' })],
      module: multerModules,
    };
  }
}
