import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
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
        throw err;
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
  getHistory(
    @Query() query: GetHistoryParamDto,
  ): Promise<GetHistoryResponseDto> {
    this.logger.log(
      `History for address: ${JSON.stringify(query.address)}`,
      'getHistory',
    );
    return this.transactionsApiService.getHistory(query.address);
  }

  @ApiOkResponse({ type: () => TransferResponseDto })
  @Get('/:transferId')
  async getTransferById(
    @Param('transferId') transferId: string,
  ): Promise<TransferResponseDto> {
    const transfer = await this.transactionsApiService.getTransferById(
      transferId,
    );
    return {
      id: transfer.id,
      txIn: {
        amount: transfer.amount,
        createdAt: transfer.createdAt,
        status: transfer.status,
        txHash: transfer.tx_in_hash,
      },
      txOut: {
        amount: transfer.amount,
        createdAt: transfer.createdAt,
        status: transfer.status,
        txHash: transfer.tx_out_hash,
      },
    };
  }

  @ApiOkResponse({ type: () => CheckStatusResponseDto })
  @Get('/transactions/transaction-status')
  checkTransactionStatus(
    @Query() query: StatusCheckDto,
  ): Promise<CheckStatusResponseDto> {
    this.logger.log(
      `Check status for: ${JSON.stringify(query)}`,
      'checkTransactionStatus',
    );
    return this.transactionsApiService.statusCheck(query);
  }
}
