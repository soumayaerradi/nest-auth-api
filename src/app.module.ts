import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuoteModule } from './quote/quote.module';

@Module({
  imports: [TypeOrmModule.forRoot(), QuoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
