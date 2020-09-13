import { Module } from '@nestjs/common';
import { TransactionsBridgeModule } from './transactions-bridge/transactions-bridge.module';
import {LoggerModule} from "nestjs-pino"


@Module({
  imports: [TransactionsBridgeModule, LoggerModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
