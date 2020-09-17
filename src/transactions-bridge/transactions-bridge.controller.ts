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
      id: null,
      poolAddress: poolAddresses[body.fromNode],
    };

    this.logger.log({ result });
    return result;
  }

  @ApiOkResponse({ type: () => GetHistoryResponseDto })
  @Get()
  getHistory(
    @Param() param: GetHistoryParamDto,
  ): Promise<GetHistoryResponseDto> {
    this.logger.log(
      `History for address: ${JSON.stringify(param.address)}`,
      'getHistory',
    );
    return this.transactionsApiService.getHistory(param.address);
  }

  @ApiOkResponse({ type: () => TransferResponseDto })
  @Get(':transferId')
  async getTransferById(
    @Param('id') transferId: string,
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
  @Get('/transaction-status')
  checkTransactionStatus(
    @Param() param: StatusCheckDto,
  ): Promise<CheckStatusResponseDto> {
    this.logger.log(
      `Check status for: ${JSON.stringify(param)}`,
      'checkTransactionStatus',
    );
    return this.transactionsApiService.statusCheck(param);
  }
}
