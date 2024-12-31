import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SEC,
  cloud_name: process.env.CLOUD_NAME,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
