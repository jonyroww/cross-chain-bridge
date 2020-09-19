import { Module } from '@nestjs/common';
import { TransactionsBridgeController } from './transactions-bridge.controller';
import { TransactionsApiService } from 'src/transactions-api/transactions-api.service';
import { TransferDataRepository } from 'src/transactions-api/repositories/transfer-data.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferData } from 'src/transactions-api/entities/transfer-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransferData, TransferDataRepository])],
  controllers: [TransactionsBridgeController],
  providers: [TransactionsApiService],
})
export class TransactionsBridgeModule {}
