import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { TransactionsApiService } from 'src/transactions-api/transactions-api.service';
import { TransferTokensBodyDto } from './dto/transfer-tokens-body.dto';
import { GetHistoryParamDto } from './dto/get-history-params.dto';
import { Logger } from 'nestjs-pino';
import { TransferTokensResponseDto } from '../transactions-api/dto/TransferTokensResponseDto';
import { GetHistoryResponseDto } from 'src/transactions-api/dto/GetHistoryResponseDto';
import { StatusCheckDto } from './dto/status-check-params.dto';
import { CheckStatusResponseDto } from 'src/transactions-api/dto/CheckStatusResponseDto';
import { TransactionDto } from 'src/transactions-api/dto/TransactionDto';
import { CreateTransferResponseDto } from './dto/CreateTransferResponse.dto';
import { TransferResponseDto } from './dto/TranferResponse.dto';

@Controller('transfers')
export class TransactionsBridgeController {
  constructor(
    private transactionsApiService: TransactionsApiService,
    private logger: Logger,
  ) {}

  @ApiCreatedResponse({ type: () => CreateTransferResponseDto })
  @Post()
  async transferTokens(
    @Body() body: TransferTokensBodyDto,
  ): Promise<CreateTransferResponseDto> {
    this.logger.log(`Transfer data: ${JSON.stringify(body)}`, 'transferTokens');

    const transferObject:
      | TransactionDto
      | { id: null } = await this.transactionsApiService
      .transferTokens(body)
      .catch(err => {
        this.logger.error(err);
        return { id: null };
      });

    this.logger.log({ transferObject });

    const poolAddresses = await this.transactionsApiService.getPoolAddresses();

    const result = {
      id: transferObject.id,
      poolAddress: poolAddresses[body.fromNode],
    };

    this.logger.log({ result });
    return result;
  }

  @ApiOkResponse({ type: () => GetHistoryResponseDto })
  @Get()
  getHistory(@Param() param: GetHistoryParamDto): GetHistoryResponseDto {
    this.logger.log(
      `History for address: ${JSON.stringify(param.address)}`,
      'getHistory',
    );
    //return this.transactionsApiService.getHistory(param.address)
    return {
      status: 'Success',
      transactions: [
        {
          id: '0c2a9ed4-412d-4666-b7f7-c369383b7b5d',
          tx_in_hash:
            '0x68df497a87d57595de94890916888e6c3ae8826df1624b22dc09e33e6b9393a3',
          tx_out_hash:
            '0x4880c44f3bba8bfda9ddd7cdb304d41fe202bb319ac28e86293367ef2915b3f5',
          address_from: '0x6efad302e8Ed34157794FeA1508159e35fE1Aa85',
          address_to: '0x6efad302e8Ed34157794FeA1508159e35fE1Aa85',
          type_in: 'ETH',
          type_out: 'BSC',
          amount: '100',
          createdAt: '2020-09-08T09:45:03.673Z',
          updatedAt: '2020-09-08T09:45:03.673Z',
          status: 'SUCCESS',
        },
      ],
    };
  }

  @ApiOkResponse({ type: () => TransferResponseDto })
  @Get(':transferId')
  getTransferById(@Param('id') transferId: string): TransferResponseDto {
    // const transfer = await this.transactionsApiService.getTransferById(
    //   transferId,
    // );
    // return {
    //   id: transfer.id,
    //   txIn: {
    //     amount: transfer.amount,
    //     createdAt: transfer.createdAt,
    //     status: transfer.status,
    //     txHash: transfer.tx_in_hash,
    //   },
    //   txOut: {
    //     amount: transfer.amount,
    //     createdAt: transfer.createdAt,
    //     status: transfer.status,
    //     txHash: transfer.tx_out_hash,
    //   },
    // };
    return {
      id: transferId,
      txIn: {
        amount: null,
        createdAt: '2020-09-08T09:45:03.673Z',
        status: 'PENDING',
        txHash: null,
      },
      txOut: {
        amount: null,
        createdAt: '2020-09-08T09:45:03.673Z',
        status: 'PENDING',
        txHash: null,
      },
    };
  }

  // @ApiOkResponse({ type: () => CheckStatusResponseDto })
  // @Get('/transaction-status')
  // checkTransactionStatus(
  //   @Param() param: StatusCheckDto,
  // ): CheckStatusResponseDto {
  //   this.logger.log(
  //     `Check status for: ${JSON.stringify(param)}`,
  //     'checkTransactionStatus',
  //   );
  //   //return this.transactionsApiService.statusCheck(param);
  //   return {
  //     status: 'SUCCESS',
  //   };
  // }
}
