import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api')
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	app.use(json({ limit: '15mb' }));
	app.use(urlencoded({ extended: true, limit: '15mb' }));

	app.enableCors({
		origin: ['http://localhost:3000', 'http://localhost:5173'],
		Credential: true,
	});

	app.use(cookieParser());
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
