import {
    IsString,
  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class GetHistoryDto {
    @ApiProperty({required: true})
    @IsString()
    address: string;
}