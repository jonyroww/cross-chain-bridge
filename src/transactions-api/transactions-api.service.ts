import { Injectable, BadRequestException } from '@nestjs/common';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { config } from 'src/config';
import { TransferTokensResponse } from './types/TransferTokensResponse';
import { GetHistoryResponse } from './types/GetHistoryResponse';
import { TransferTokensDto } from 'src/transactions-bridge/dto/transfer-tokens.dto';
import { Logger } from "nestjs-pino";


@Injectable()
export class TransactionsApiService {
    constructor(private readonly logger: Logger) {}

    public async transferTokens({addressFrom, addressTo, amount, fromNode, toNode}: TransferTokensDto): Promise<TransferTokensResponse>{
        try {
            return await axios.post(config.TRANSFER_TOKENS_API_URL, {
                addressFrom,
                addressTo,
                amount,
                fromNode,
                toNode
            })
        } catch (e) {
            console.error(e);
            this.logger.error(JSON.stringify(e))
            throw new BadRequestException(e.message)
        }
    }

    public async getHistory(address: string): Promise<GetHistoryResponse> {
        try {
            return await axios.get(config.HISTORY_TRANSACTIONS_API, {params: {address}})
        } catch (e) {
            console.error(e);
            this.logger.error(JSON.stringify(e))
            throw new BadRequestException(e.message)
        }
    }
}
