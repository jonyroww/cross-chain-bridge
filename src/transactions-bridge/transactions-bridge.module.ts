import { Module } from '@nestjs/common';
import { TransactionsBridgeController } from './transactions-bridge.controller';
import { TransactionsBridgeService } from './transactions-bridge.service';

@Module({
  controllers: [TransactionsBridgeController],
  providers: [TransactionsBridgeService]
})
export class TransactionsBridgeModule {}
