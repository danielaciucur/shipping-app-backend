import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  console.log('Port running on: ', port)

    const options = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Shipping App')
      .setDescription('Shipping App API documentation')
      .setVersion('1.0')
      .addTag('Shipping App')
      .build()
  await app.listen(3000);

  const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api', app, document)
}
bootstrap();
