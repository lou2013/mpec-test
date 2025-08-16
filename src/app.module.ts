import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoadConfigs } from '@common/config/configs';
import { ValidationModule } from '@common/modules/validation/validation.module';
import { V1Module } from './api/api.module';
import { DatabaseModule } from '@common/modules/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [LoadConfigs],
    }),
    DatabaseModule,
    V1Module,
    ValidationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
