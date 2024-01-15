import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";

const buildOpenApiSpec = (app: INestApplication): OpenAPIObject => {
  const openApiConfig = new DocumentBuilder()
    .setTitle("Shortened Link API")
    .setDescription("Shortened Link API")
    .setVersion("0.0.1")
    .addBearerAuth({
      name: "Authorization",
      bearerFormat: "Bearer",
      scheme: "Bearer",
      type: "http",
      in: "Header",
    })
    .build();

  const openApiDocument = SwaggerModule.createDocument(app, openApiConfig);

  openApiDocument.components ??= {};
  openApiDocument.components.responses ??= {};
  openApiDocument.components.responses["NotAuthorized"] = {
    description: "The requester is unauthorized",
  };
  openApiDocument.components.responses["BadRequest"] = {
    description: "The request is invalid",
  };

  const verbs = ["get", "post", "put", "delete", "options", "head"] as const;
  Object.values(openApiDocument.paths).forEach((path) => {
    verbs.forEach((verb) => {
      const method = path[verb];
      if (!method) {
        return;
      }

      method.responses["400"] ??= {
        $ref: "#/components/responses/BadRequest",
      };

      const hasSecurity = !!method.security && method.security.length > 0;
      if (hasSecurity) {
        method.responses["401"] ??= {
          $ref: "#/components/responses/NotAuthorized",
        };
      }
    });
  });

  return openApiDocument;
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const openApiDocument = buildOpenApiSpec(app);
  SwaggerModule.setup("doc", app, openApiDocument);

  await app.listen(3000);
}
bootstrap();
