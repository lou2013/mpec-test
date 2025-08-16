import { AppConfig } from '@common/config/app.config';
import { SwaggerConfig } from '@common/config/swagger.config';
import { AppConfigs } from '@common/const/app.configs';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';

export function swaggerBootstrap(app: INestApplication): void {
  let users = {};
  const swaggerConfig = app
    .get<ConfigService>(ConfigService)
    .get<SwaggerConfig>(AppConfigs.SWAGGER);
  for (const data of swaggerConfig?.auth ?? []) {
    users = { ...users, ...data };
  }

  const appConfig = app
    .get<ConfigService>(ConfigService)
    .get<AppConfig>(AppConfigs.APP);
  if (Object.keys(users).length > 0) {
    app.use(
      ['/docs'],
      basicAuth({
        challenge: true,
        users: users,
      })
    );
  }

  const documents = new DocumentBuilder()
    .setTitle(appConfig!.name)
    .setDescription(appConfig!.description);

  const openApiObject = SwaggerModule.createDocument(app, documents.build());
  SwaggerModule.setup('docs', app, openApiObject, {});
}
