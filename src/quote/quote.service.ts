import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QuoteEntity } from './quote.entity';
import { QuoteDTO, QuoteRO } from './quote.dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class QuoteService {

    constructor(
        @InjectRepository(QuoteEntity)
        private _quoteRepository: Repository<QuoteEntity>,

        @InjectRepository(UserEntity)
        private _userRepository: Repository<UserEntity>,
    ) { }

    private quoteToResponseObject(quote: QuoteEntity): QuoteRO {
        return { ...quote, author: quote.author.toResponseObject(false) }
    }

    async showAll(): Promise<any> {
        const quotes = await this._quoteRepository.find({ relations: ['author'] });
        return quotes;
    }

    async create(userId: string, data: QuoteDTO): Promise<QuoteRO>  {
        const user = await this._userRepository.findOne({ where: { id: userId } });
        const newQuote = await this._quoteRepository.create({ ...data, author: user });
        await this._quoteRepository.save(newQuote);
        return this.quoteToResponseObject(newQuote);
    }
 
    async read(id: string): Promise<QuoteRO>  {
        const quote: QuoteEntity = await this._quoteRepository.findOne({ where: { id }, relations: ['author'] });
        if (!quote) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return this.quoteToResponseObject(quote);
    }

    async update(id: string, data: Partial<QuoteDTO>): Promise<QuoteRO> {
        let quote = await this._quoteRepository.findOne({ where: { id }, relations: ['author'] });
        if (!quote) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        await this._quoteRepository.update({ id }, data);
        quote = await this._quoteRepository.findOne({ where: { id }, relations: ['author'] });
        return this.quoteToResponseObject(quote);
    }

    async destroy(id: string): Promise<QuoteRO> {
        const quote = await this._quoteRepository.findOne({ where: { id }, relations: ['author'] });
        if (!quote) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        await this._quoteRepository.delete({ id });
        return this.quoteToResponseObject(quote);
    }
}
