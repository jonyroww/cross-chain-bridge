import { Injectable, BadRequestException } from '@nestjs/common';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { config } from 'src/config';
import { TransferTokensResponseDto } from './dto/TransferTokensResponseDto';
import { GetHistoryResponseDto } from './dto/GetHistoryResponseDto';
import { TransferTokensBodyDto } from 'src/transactions-bridge/dto/transfer-tokens-body.dto';
import { Logger } from "nestjs-pino";


@Injectable()
export class TransactionsApiService {
    constructor(private readonly logger: Logger) {}

    public async transferTokens({addressFrom, addressTo, amount, fromNode, toNode}: TransferTokensBodyDto): Promise<TransferTokensResponseDto>{
        try {
            const transferResponse = await axios.post(config.TRANSFER_TOKENS_API_URL, {
                addressFrom,
                addressTo,
                amount,
                fromNode,
                toNode
            });
            return transferResponse.data;
        } catch (e) {
            console.error(e);
            this.logger.error(JSON.stringify(e))
            throw e;
        }
    }

    public async getHistory(address: string): Promise<GetHistoryResponseDto> {
        try {
            const historyResponse = await axios.get(config.HISTORY_TRANSACTIONS_API, {params: {address}});
            return historyResponse.data;
        } catch (e) {
            console.error(e);
            this.logger.error(JSON.stringify(e))
            throw e;
        }
    }
}
