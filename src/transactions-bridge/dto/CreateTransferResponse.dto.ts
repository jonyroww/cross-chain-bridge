import { ApiProperty } from '@nestjs/swagger';

export class CreateTransferResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  holderAddress: string;
}
