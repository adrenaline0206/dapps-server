import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainModule } from './modules/main.module';
import { dbConfig } from './db.config';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), MainModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
