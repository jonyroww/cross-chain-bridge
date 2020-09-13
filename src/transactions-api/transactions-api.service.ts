import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { config } from 'src/config';
import { TransferTokensResponseDto } from './dto/TransferTokensResponseDto';
import { GetHistoryResponseDto } from './dto/GetHistoryResponseDto';
import { TransferTokensBodyDto } from 'src/transactions-bridge/dto/transfer-tokens-body.dto';
import { Logger } from "nestjs-pino";
import { StatusCheckDto } from '../transactions-bridge/dto/status-check-params.dto';
import { CheckStatusResponseDto } from './dto/CheckStatusResponseDto';


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
            this.logger.error(JSON.stringify(e));
            throw e;
        }
    }

    public async getHistory(address: string): Promise<GetHistoryResponseDto> {
        try {
            const historyResponse = await axios.get(config.HISTORY_TRANSACTIONS_API, {params: {address}});
            return historyResponse.data;
        } catch (e) {
            console.error(e);
            this.logger.error(JSON.stringify(e));
            throw e;
        }
    }

    public async statusCheck({txHash, nodeType}: StatusCheckDto): Promise<CheckStatusResponseDto>{
        try {
            const statusCheckResponse = await axios.get(config.STATUS_CHECK_API, {params: {
                tx_hash: txHash,
                type: nodeType
            }})
            return statusCheckResponse.data;
        } catch (e) {
            console.error(e);
            this.logger.error(JSON.stringify(e));
            throw e;
        }
    }
}
