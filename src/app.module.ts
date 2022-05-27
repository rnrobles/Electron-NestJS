import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from './db/db.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';

@Module({
  imports: [
    DbModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'sqlite.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  //controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
