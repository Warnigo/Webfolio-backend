import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const swagger_config = new DocumentBuilder()
    .setTitle('Webfolio Landing')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swagger_config, {});
  SwaggerModule.setup('api/docs', app, document);
  const port = configService.get<number>('port');
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
