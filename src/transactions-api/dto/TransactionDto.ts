import { StatusTypes } from '../constants/StatusTypes.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';

export class TransactionDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  tx_in_hash: string;

  @ApiProperty()
  @IsString()
  tx_out_hash: string;

  @ApiProperty()
  @IsString()
  address_from: string;

  @ApiProperty()
  @IsString()
  address_to: string;

  @ApiProperty()
  @IsString()
  type_in: string;

  @ApiProperty()
  @IsString()
  type_out: string;

  @ApiProperty()
  @IsString()
  amount: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  createdAt: string;

  @ApiProperty()
  @IsString()
  updatedAt: string;
}
