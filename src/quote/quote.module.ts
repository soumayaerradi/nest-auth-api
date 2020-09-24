import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { QuoteEntity } from './quote.entity';
import { UserEntity } from 'src/user/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([QuoteEntity, UserEntity])],
    controllers: [QuoteController],
    providers: [QuoteService]
})
export class QuoteModule { }
