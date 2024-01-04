import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(process.env.BACKEND_PORT, () =>
    console.log('Connected to the port : ---> ' + process.env.BACKEND_PORT),
  );
}
bootstrap();
