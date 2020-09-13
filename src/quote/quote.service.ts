import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QuoteEntity } from './quote.entity';
import { QuoteDTO } from './quote.dto';

@Injectable()
export class QuoteService {

    constructor(@InjectRepository(QuoteEntity) private _quoteRepository: Repository<QuoteEntity>) { }

    async showAll() {
        return await this._quoteRepository.find();
    }

    async create(data: QuoteDTO) {
        const quote = await this._quoteRepository.create(data);
        await this._quoteRepository.save(quote);
        return quote;
    }

    async read(id: string) {
        const quote = await this._quoteRepository.findOne({ where: { id: id } });
        if(!quote) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return quote;
    }

    async update(id: string, data: Partial<QuoteDTO>) {
        await this._quoteRepository.update({ id }, data);
        return this._quoteRepository.findOne({ id });
    }

    async destroy(id: string) {
        await this._quoteRepository.delete({ id });
        return { deleted: true };
    }
}
