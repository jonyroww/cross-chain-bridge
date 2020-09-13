import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { TransactionsApiService } from 'src/transactions-api/transactions-api.service';
import { TransferTokensBodyDto } from './dto/transfer-tokens-body.dto';
import { GetHistoryParamDto } from './dto/get-history-params.dto';
import { Logger } from "nestjs-pino";
import { TransferTokensResponseDto } from '../transactions-api/dto/TransferTokensResponseDto';
import { GetHistoryResponseDto } from 'src/transactions-api/dto/GetHistoryResponseDto';
import { StatusCheckDto } from './dto/status-check-params.dto';
import { CheckStatusResponseDto } from 'src/transactions-api/dto/CheckStatusResponseDto';


@Controller('transfers')
export class TransactionsBridgeController {
    constructor(
        private transactionsApiService: TransactionsApiService,
        private logger: Logger
        ){}

    @ApiCreatedResponse({type: () => TransferTokensResponseDto})
    @Post()
    transferTokens(@Body() body: TransferTokensBodyDto): TransferTokensResponseDto {
        this.logger.log(`Transfer data: ${JSON.stringify(body)}`, "transferTokens")
        //return this.transactionsApiService.transferTokens(body)
        return {
            status: "Success",
            result: {
              id: "6c72bb89-7a87-4511-8cd8-5c90a0c32638",
              tx_in_hash: "0xcb44f2840fc657d61b09a6b5e13799c7c42ab49884d3e48a6d86634808729156",
              tx_out_hash: "0x65b3e209e6e39d6e4db436232e76d3c63ff5667eed757712b17a2b7f98760afc",
              address_from: `${body.addressFrom}`,
              address_to: `${body.addressTo}`,
              type_in: `${body.toNode}`,
              type_out: `${body.fromNode}`,
              amount: `${body.amount}`,
              createdAt: "2020-09-07T11:54:33.075Z",
              updatedAt: "2020-09-07T11:54:33.075Z",
              status: "PENDING"
            }
          }
    }

    @ApiOkResponse({type: () => GetHistoryResponseDto})
    @Get()
    getHistory(@Param() param: GetHistoryParamDto): GetHistoryResponseDto {
        this.logger.log(`History for address: ${JSON.stringify(param.address)}`, "getHistory")
        //return this.transactionsApiService.getHistory(param.address)
        return {
            status: "Success",
            transactions: [
              {
                id: "0c2a9ed4-412d-4666-b7f7-c369383b7b5d",
                tx_in_hash: "0x68df497a87d57595de94890916888e6c3ae8826df1624b22dc09e33e6b9393a3",
                tx_out_hash: "0x4880c44f3bba8bfda9ddd7cdb304d41fe202bb319ac28e86293367ef2915b3f5",
                address_from: "0x6efad302e8Ed34157794FeA1508159e35fE1Aa85",
                address_to: "0x6efad302e8Ed34157794FeA1508159e35fE1Aa85",
                type_in: "ETH",
                type_out: "BSC",
                amount: "100",
                createdAt: "2020-09-08T09:45:03.673Z",
                updatedAt: "2020-09-08T09:45:03.673Z",
                status: "SUCCESS"
              }
            ]
        }
    }

    @ApiOkResponse({type: () => CheckStatusResponseDto})
    @Get("/transaction-status")
    checkTransactionStatus(@Param() param: StatusCheckDto): CheckStatusResponseDto {
      this.logger.log(`Check status for: ${JSON.stringify(param)}`, "checkTransactionStatus")
      //return this.transactionsApiService.statusCheck(param);
      return {
        status: "SUCCESS"
      }
    }
}
