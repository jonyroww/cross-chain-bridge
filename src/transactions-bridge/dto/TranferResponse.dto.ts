import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TransferResponseDto {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  txOut: TransferTransactionDto;

  @ApiPropertyOptional()
  txIn: TransferTransactionDto;
}

export class TransferTransactionDto {
  @ApiPropertyOptional()
  txHash: string;

  @ApiPropertyOptional()
  amount: string;

  @ApiProperty()
  status: string;

  @ApiPropertyOptional()
  createdAt: string;
}
