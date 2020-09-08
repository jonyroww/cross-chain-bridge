import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { TransactionsApiService } from 'src/transactions-api/transactions-api.service';
import { TransferTokensDto } from './dto/transfer-tokens.dto';
import { GetHistoryDto } from './dto/get-history.dto';


@Controller('transfers')
export class TransactionsBridgeController {
    constructor(private transactionsApiService: TransactionsApiService){}

    @ApiCreatedResponse()
    @Post()
    transferTokens(@Body() body: TransferTokensDto){
        return this.transactionsApiService.transferTokens(body)
    }

    @ApiOkResponse()
    @Get()
    getHistory(@Param() param: GetHistoryDto){
        return this.transactionsApiService.getHistory(param.address)
    }
}
