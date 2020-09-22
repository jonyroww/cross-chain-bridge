import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NodeTypes } from '../constants/NodeTypes.enum';
import { TransactionDto } from '../dto/TransactionDto';

@Entity({ name: 'transfer_data' })
export class TransferData {
  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @ApiProperty({
    type: 'string',
    example: '2019-11-22T16:03:05Z',
    nullable: false,
  })
  @CreateDateColumn({
    nullable: false,
    type: 'timestamp with time zone',
  })
  created_at: Date;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  addressFrom: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  addressTo: string;

  @ApiProperty()
  @Column({
    enum: NodeTypes,
  })
  fromNode: NodeTypes;

  @ApiProperty()
  @Column({
    enum: NodeTypes,
  })
  toNode: NodeTypes;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  transactionId: string;

  @ApiProperty()
  @Column({
    type: 'jsonb',
  })
  transferResponse: string;
}
