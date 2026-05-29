import "dotenv/config";

import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ZodValidationPipe } from "nestjs-zod";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enableCors();
	app.useGlobalPipes(new ZodValidationPipe());
	app.set("trust proxy", true);
	await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
