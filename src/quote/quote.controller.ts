import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, Logger, UseGuards } from '@nestjs/common';

import { QuoteService } from './quote.service';
import { QuoteDTO } from './quote.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from 'src/user/user.decorator';

@Controller('api/quotes')
export class QuoteController {
    private logger = new Logger('QuoteController');

    constructor(private _quoteService: QuoteService) { }

    private logData(options: any) {
        options.user && this.logger.log('USER ' + JSON.stringify(options.user));
        options.data && this.logger.log('DATA ' + JSON.stringify(options.data));
        options.id && this.logger.log('IDEA ' + JSON.stringify(options.id));
    }

    @Get()
    showAllQuotes() {
        return this._quoteService.showAll();
    }

    @Post()
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    createQuote(@User('id') userId, @Body() data: QuoteDTO) {
        this.logData({ userId, data });
        return this._quoteService.create(userId, data);
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
