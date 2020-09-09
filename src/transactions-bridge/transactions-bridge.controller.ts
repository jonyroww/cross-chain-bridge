import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { TransactionsApiService } from 'src/transactions-api/transactions-api.service';
import { TransferTokensDto } from './dto/transfer-tokens.dto';
import { GetHistoryDto } from './dto/get-history.dto';
import { Logger } from "nestjs-pino";


@Controller('transfers')
export class TransactionsBridgeController {
    constructor(
        private transactionsApiService: TransactionsApiService,
        private logger: Logger
        ){}

    @ApiCreatedResponse()
    @Post()
    transferTokens(@Body() body: TransferTokensDto){
        this.logger.log(`Transfer data: ${JSON.stringify(body)}`, "transferTokens")
        return this.transactionsApiService.transferTokens(body)
    }

    @ApiOkResponse()
    @Get()
    getHistory(@Param() param: GetHistoryDto){
        this.logger.log(`History for address: ${JSON.stringify(param.address)}`, "getHistory")
        return this.transactionsApiService.getHistory(param.address)
    }
}
