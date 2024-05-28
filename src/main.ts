import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipes";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as path from "path";
import * as fs from "node:fs";

dotenv.config();

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Backend MTG Application')
    .setDescription('Документация для бэкенда')
    .setVersion('1.0.0')
    .addTag('by Evrige')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const uploadsDir = path.join(__dirname, '..', 'uploads');
  console.log('Сервируем статические файлы из:', uploadsDir);

  // Проверяем существование папки uploads и создаем её, если она отсутствует
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  app.use('/uploads', express.static(uploadsDir));

  app.enableCors({
    origin: ['http://localhost:3000', 'https://tournament-frontend-sable.vercel.app'],
    credentials: true
  });

  await app.listen(PORT, () => {
    console.log('Слушаем порт ' + PORT);
  });
}

bootstrap();
