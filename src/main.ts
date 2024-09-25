import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  const port = configService.get<number>('PORT')
  const version = configService.get<number>('API_VERSION')

  app.setGlobalPrefix(`api/v${version}`)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Webfolio Landing')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig, {})
  SwaggerModule.setup('api-landing/docs', app, document)

  await app.listen(port)
  console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
