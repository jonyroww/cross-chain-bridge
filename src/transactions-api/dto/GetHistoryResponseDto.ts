import { TransactionDto } from './TransactionDto';

export class GetHistoryResponseDto {
  status: string;
  transactions: TransactionDto[];
}
