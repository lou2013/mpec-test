import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLogger } from '@common/logger/logger';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SerializerInterceptor } from '@common/interceptor/serializer.interceptor';
import { GlobalValidationPipe } from '@common/pipes/global-validation.pipe';
import { Logger } from '@nestjs/common';
import { swaggerBootstrap } from './swagger-bootstrap.helper';
import { ServerConfig } from '@common/config/server.config';
import { AppConfigs } from '@common/const/app.configs';
import { GlobalBaseExceptionFilter } from '@common/filters/base-exception.filter';
import { TypeOrmExceptionFilter } from '@common/filters/typeorm-exception.filter';
import { GlobalExceptionFilter } from '@common/filters/error.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const logger = new Logger('ExceptionFilter');
  const serverConfig = configService.get<ServerConfig>(AppConfigs.SERVER);

  app.useLogger(WinstonLogger());
  app.useGlobalInterceptors(SerializerInterceptor(app));

  app.useGlobalPipes(GlobalValidationPipe);
  app.useGlobalFilters(
    new GlobalExceptionFilter(logger),
    new GlobalBaseExceptionFilter(logger),
    new TypeOrmExceptionFilter(logger)
  );

  app.enableCors({
    exposedHeaders: ['*'],
    origin: [],
  });

  swaggerBootstrap(app);
  await app.listen(serverConfig?.port ?? 3000, serverConfig?.host ?? '0.0.0.0');
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises, unicorn/prefer-top-level-await
bootstrap();
