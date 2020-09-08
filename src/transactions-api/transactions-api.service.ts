import { Injectable } from '@nestjs/common';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { config } from 'src/config';
import { NodeTypes } from './constants/NodeTypes.enum';
import { TransferTokensResponse } from './types/TransferTokensResponse';
import { GetHistoryResponse } from './types/GetHistoryResponse';
import { TransferTokensDto } from 'src/transactions-bridge/dto/transfer-tokens.dto';


@Injectable()
export class TransactionsApiService {
    public transferTokens({addressFrom, addressTo, amount, fromNode, toNode}: TransferTokensDto): AxiosPromise<TransferTokensResponse>{
        return axios.post(config.TRANSFER_TOKENS_API_URL, {
            addressFrom,
            addressTo,
            amount,
            fromNode,
            toNode
        })
    }

    public getHistory(address: string): AxiosPromise<GetHistoryResponse> {
        return axios.get(config.HISTORY_TRANSACTIONS_API, {params: {address}})
    }
}
