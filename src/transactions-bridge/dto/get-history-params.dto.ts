import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetHistoryParamDto {
  @ApiProperty({ required: true })
  @IsString()
  address: string;
}
