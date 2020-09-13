import { ApiProperty } from "@nestjs/swagger";
import {
    IsNumber,
    IsString,
    IsEnum,
  } from 'class-validator';
import { NodeTypes } from "src/transactions-api/constants/NodeTypes.enum";


export class TransferTokensBodyDto {
    @ApiProperty({required: true})
    @IsString()
    addressFrom: string;

    @ApiProperty({required: true})
    @IsString()
    addressTo: string;

    @ApiProperty({required: true})
    @IsNumber()
    amount: number;

    @ApiProperty({enum: NodeTypes,required: true})
    @IsEnum(NodeTypes)
    fromNode: NodeTypes;

    @ApiProperty({enum: NodeTypes,required: true})
    @IsEnum(NodeTypes)
    toNode: NodeTypes;
}