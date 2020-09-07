import { Module } from '@nestjs/common';
import { TransactionsBridgeModule } from './transactions-bridge/transactions-bridge.module';



@Module({
  imports: [TransactionsBridgeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
