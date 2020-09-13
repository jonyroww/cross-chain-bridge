import { TransactionDto } from './TransactionDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TransferTokensResponseDto {
  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  result: TransactionDto;
}
