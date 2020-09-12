import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

import { QuoteService } from './quote.service';
import { QuoteDTO } from './quote.dto';

@Controller('quote')
export class QuoteController {

    constructor(private _quoteService: QuoteService) { }

    @Get()
    showAllQuotes() {
        return this._quoteService.showAll();
    }

    @Post()
    createQuote(@Body() data: QuoteDTO) {
        return this._quoteService.create(data);
    }

    @Get(':id')
    readQuote(@Param('id') id: string) {
        return this._quoteService.read(id);
    }

    @Put(':id')
    updateQuote(@Param('id') id: string, @Body() data: Partial<QuoteDTO>) {
        return this._quoteService.update(id, data);
    }

    @Delete(':id')
    destroyQuote(@Param('id') id: string) {
        return this._quoteService.destroy(id);
    }
}
