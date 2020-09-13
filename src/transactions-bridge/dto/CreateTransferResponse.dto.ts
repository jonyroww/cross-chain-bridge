import { ApiProperty } from '@nestjs/swagger';

export class CreateTransferResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  poolAddress: string;
}
