import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse, AxiosPromise } from 'axios';
import { config } from 'src/config';
import { NodeTypes } from './constants/NodeTypes.enum';
import { TransferTokensResponse } from './types/TransferTokensResponse';


@Injectable()
export class TransactionsBridgeService {
    public transferTokens(addressFrom: string, addressTo: string, amount: number, fromNode: NodeTypes, toNode: NodeTypes): AxiosPromise<TransferTokensResponse>{
        return  axios.post(config.TRANSFER_TOKENS_API_URL, {
            addressFrom,
            addressTo,
            amount,
            fromNode,
            toNode
        })
    }

}
