import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as coockieParser from 'cookie-parser';
import 'dotenv/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    console.log(process.env.FRONTEND_URL, process.env.SUPABASE_URL_PROJECT);
    app.enableCors({
        origin: [process.env.FRONTEND_URL, process.env.SUPABASE_URL_PROJECT],
        credentials: true,
    });
    app.use(coockieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
