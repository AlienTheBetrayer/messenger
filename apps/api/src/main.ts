import "dotenv/config";

import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
import { ZodValidationPipe } from "nestjs-zod";

import { ResponseInterceptor } from "./app.interceptor";
import { AppModule } from "./app.module";
import { AppConfigService } from "./modules/config/config.service";

async function bootstrap(): Promise<void> {
	// app creation
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	// services
	const configService = app.get(AppConfigService);

	// config
	const port = configService.get("PORT") ?? 3001;

	// setting up
	app.enableCors();
	app.useGlobalPipes(new ZodValidationPipe());
	app.useGlobalInterceptors(new ResponseInterceptor());
	app.set("trust proxy", true);
	app.use(cookieParser());

	// listening
	await app.listen(port);
}

void bootstrap();
