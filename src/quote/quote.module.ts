import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { QuoteEntity } from './quote.entity';

@Module({
    imports: [TypeOrmModule.forFeature([QuoteEntity])],
    controllers: [QuoteController],
    providers: [QuoteService]
})
export class QuoteModule { }
