import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:
      process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()) ??
      true,
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Multiplatform API')
    .setDescription('Authentication and user management API')
    .setVersion('1.0')
    .addTag('auth', 'Authentication and session management')
    .addTag('users', 'User management')
    .addBearerAuth()
    .addCookieAuth('refreshToken')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
