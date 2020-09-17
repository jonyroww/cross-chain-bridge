import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { NodeTypes } from '../../transactions-api/constants/NodeTypes.enum';

export class StatusCheckDto {
  @ApiProperty()
  @IsString()
  tx_hash: string;

  @ApiProperty({ enum: NodeTypes })
  @IsEnum(NodeTypes)
  type: NodeTypes;
}
