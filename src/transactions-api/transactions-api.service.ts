import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { config } from 'src/config';
import { TransferTokensResponseDto } from './dto/TransferTokensResponseDto';
import { GetHistoryResponseDto } from './dto/GetHistoryResponseDto';
import { TransferTokensBodyDto } from 'src/transactions-bridge/dto/transfer-tokens-body.dto';
import { Logger } from 'nestjs-pino';
import { StatusCheckDto } from '../transactions-bridge/dto/status-check-params.dto';
import { CheckStatusResponseDto } from './dto/CheckStatusResponseDto';
import { TransactionDto } from './dto/TransactionDto';

@Injectable()
export class TransactionsApiService {
  private axiosInstance: AxiosInstance;
  constructor(private readonly logger: Logger) {
    this.axiosInstance = axios.create({
      baseURL: config.IGNITE_TOKEN_EXCHANGE_API_BASE_URL,
    });
  }

  public async transferTokens(
    params: TransferTokensBodyDto,
  ): Promise<TransactionDto> {
    try {
      const transferResponse = await this.axiosInstance.post<
        TransferTokensResponseDto
      >('/transfer', params);

      return transferResponse.data.result;
    } catch (e) {
      console.error(e);
      this.logger.error(JSON.stringify(e));
      throw e;
    }
  }

  public async getHistory(address: string): Promise<GetHistoryResponseDto> {
    try {
      const historyResponse = await axios.get(config.HISTORY_TRANSACTIONS_API, {
        params: { address },
      });
      return historyResponse.data;
    } catch (e) {
      console.error(e);
      this.logger.error(JSON.stringify(e));
      throw e;
    }
  }

  public async statusCheck({
    txHash,
    nodeType,
  }: StatusCheckDto): Promise<CheckStatusResponseDto> {
    try {
      const statusCheckResponse = await axios.get(config.STATUS_CHECK_API, {
        params: {
          tx_hash: txHash,
          type: nodeType,
        },
      });
      return statusCheckResponse.data;
    } catch (e) {
      console.error(e);
      this.logger.error(JSON.stringify(e));
      throw e;
    }
  }
}
