import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { config } from 'src/config';
import { TransferTokensResponseDto } from './dto/TransferTokensResponseDto';
import { GetHistoryResponseDto } from './dto/GetHistoryResponseDto';
import { TransferTokensBodyDto } from 'src/transactions-bridge/dto/transfer-tokens-body.dto';
import { Logger } from 'nestjs-pino';
import { StatusCheckDto } from '../transactions-bridge/dto/status-check-params.dto';
import { CheckStatusResponseDto } from './dto/CheckStatusResponseDto';
import { TransactionDto } from './dto/TransactionDto';
import { TransferDataRepository } from './repositories/transfer-data.repository';

@Injectable()
export class TransactionsApiService {
  private axiosInstance: AxiosInstance;
  constructor(
    private readonly logger: Logger,
    private transferDataRepository: TransferDataRepository,
  ) {
    this.axiosInstance = axios.create({
      baseURL: config.IGNITE_TOKEN_EXCHANGE_API_BASE_URL,
    });
  }

  public async transferTokens(
    body: TransferTokensBodyDto,
  ): Promise<TransactionDto> {
    try {
      const transferResponse = await this.axiosInstance.post<
        TransferTokensResponseDto
      >('/transfer', body);
      const transferData = this.transferDataRepository.create(body);
      if (transferResponse.status === 201 && transferResponse.data.result) {
        transferData.transactionId = transferResponse.data.result.id;
      }
      await this.transferDataRepository.save(transferData);
      return transferResponse.data.result;
    } catch (error) {
      if (
        error.response &&
        error.response.status < 500 &&
        error.response.data &&
        Array.isArray(error.response.data.errors)
      ) {
        throw new HttpException(
          error.response.data.errors[0],
          error.response.status,
        );
      }
      console.error(error);
      this.logger.error(JSON.stringify(error));
      throw error;
    }
  }

  public async getHistory(address: string): Promise<GetHistoryResponseDto> {
    try {
      const historyResponse = await this.axiosInstance.get<
        GetHistoryResponseDto
      >('/transactions/bsc', { params: { address } });
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
      const statusCheckResponse = await this.axiosInstance.get<
        CheckStatusResponseDto
      >('/transactions/status', {
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

  public async getTransferById(transferId: string): Promise<TransactionDto> {
    try {
      const transferResponse = await this.axiosInstance.get<
        TransferTokensResponseDto
      >(`transfer/get/${transferId}`);

      return transferResponse.data.result;
    } catch (err) {
      console.error(err);
      this.logger.error(JSON.stringify(err));
      throw err;
    }
  }

  public async getPoolAddresses(): Promise<{ ETH: string; BSC: string }> {
    return this.axiosInstance
      .get('transfer/holders')
      .then(res => res.data.result);
  }
}
