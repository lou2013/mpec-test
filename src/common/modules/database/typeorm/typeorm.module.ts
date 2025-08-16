import { PostgresqlConfig } from '@common/config/postgresql.config';
import { AppConfigs } from '@common/const/app.configs';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Answer,
  Course,
  Example,
  PatternInstance,
  PatternTemplate,
} from 'db/entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const postgresConfig = configService.get<PostgresqlConfig>(
          AppConfigs.MAIN_DATABASE
        );
        console.log(postgresConfig);

        return {
          ...postgresConfig,
          entities: [Answer, Course, Example, PatternInstance, PatternTemplate],
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class TypeormModule {}
