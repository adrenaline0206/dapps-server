import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORSを許可
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });

  // Swaggerの設定
  const options = new DocumentBuilder()
    .setTitle('Dapps server')
    .setDescription('API description for Dapps server')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // 3000ポートでリクエストを受ける
  await app.listen(3000);
}
bootstrap();
