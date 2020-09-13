import { Module } from '@nestjs/common';
import { TransactionsBridgeController } from './transactions-bridge.controller';
import { TransactionsApiService } from 'src/transactions-api/transactions-api.service';

@Module({
  controllers: [TransactionsBridgeController],
  providers: [TransactionsApiService],
})
export class TransactionsBridgeModule {}
