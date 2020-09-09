import { TransactionDto } from "./TransactionDto";

export class GetHistoryDto {
    status: string;
    transactions: TransactionDto[];
}