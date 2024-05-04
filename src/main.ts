import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

dotenv.config();

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Backend MTG Application')
    .setDescription('Documentation for the backend')
    .setVersion('1.0.0')
    .addTag('Evrige')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => { console.log('listening on port ' + PORT)})
}
bootstrap();

