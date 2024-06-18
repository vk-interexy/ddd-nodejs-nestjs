import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  const port = config.get("app.port");

  const swagger = new DocumentBuilder()
    .setTitle("Template NestJS")
    .setDescription("The template API description")
    .setVersion("1.0")
    .addTag("cats")
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(port);
}

bootstrap();
