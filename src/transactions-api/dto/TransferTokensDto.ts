import { TransactionDto } from "./TransactionDto";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class TransferTokensDto {
    @ApiProperty()
    @IsString()
    status: string;
    
    @ApiProperty()
    result: TransactionDto;
}


