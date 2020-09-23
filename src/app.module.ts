import { Module } from '@nestjs/common';
import { TransactionsBridgeModule } from './transactions-bridge/transactions-bridge.module';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';
import path from 'path';
import appRootPath from 'app-root-path';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TransactionsBridgeModule,
    LoggerModule.forRootAsync({
      useFactory() {
        return {
          pinoHttp: {
            stream: pino.destination(
              path.join(appRootPath.toString(), 'logs', 'combined.log'),
            ),
          },
        };
      },
    }),
    TypeOrmModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
