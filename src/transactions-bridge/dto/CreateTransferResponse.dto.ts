import { ApiProperty } from '@nestjs/swagger';

export class CreateTransferResponseDto {
  @ApiProperty()
  id: string;
}
