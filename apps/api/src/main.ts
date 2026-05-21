import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module.js";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors(); // Allow requests from other ports (like 3000)
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
