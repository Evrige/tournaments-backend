import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipes";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as path from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import * as fs from "node:fs";

dotenv.config();

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Backend MTG Application')
    .setDescription('Documentation for the backend')
    .setVersion('1.0.0')
    .addTag('by Evrige')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser());
  const baseDir = path.join(__dirname, '..');
  const uploadsDir = path.join(baseDir, 'uploads');

  app.use('/uploads', express.static(uploadsDir));
  app.enableCors({
    origin: ['http://localhost:3000', 'https://tournament-frontend-sable.vercel.app'],
    credentials: true,
  });

  await app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
  });
}
bootstrap();