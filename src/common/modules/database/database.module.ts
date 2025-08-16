import { Module, Global } from '@nestjs/common';
import { TypeormModule } from './typeorm/typeorm.module';

@Global()
@Module({
  imports: [TypeormModule],
  exports: [TypeormModule],
})
export class DatabaseModule {}
