export interface TransferTokensResponse {
    status: string,
    result: ResultInterface
}

interface ResultInterface {
    transactionHash: string,
    transactionIndex: number,
    blockHash: string,
    blockNumber: number,
    from: string,
    to: string,
    gasUsed: number,
    cumulativeGasUsed: number,
    contractAddress: string | null,
    logs: Object[],
    status: boolean,
    logsBloom: string
}

