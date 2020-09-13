import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, Logger } from '@nestjs/common';

import { QuoteService } from './quote.service';
import { QuoteDTO } from './quote.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';

@Controller('quote')
export class QuoteController {
    private logger = new Logger('QuoteController');
    constructor(private _quoteService: QuoteService) { }

    @Get()
    showAllQuotes() {
        return this._quoteService.showAll();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createQuote(@Body() data: QuoteDTO) {
        this.logger.log(JSON.stringify(data));
        return this._quoteService.create(data);
    }

    @Get(':id')
    readQuote(@Param('id') id: string) {
        return this._quoteService.read(id);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateQuote(@Param('id') id: string, @Body() data: Partial<QuoteDTO>) {
        this.logger.log(JSON.stringify(data));
        return this._quoteService.update(id, data);
    }

    @Delete(':id')
    destroyQuote(@Param('id') id: string) {
        return this._quoteService.destroy(id);
    }
}
