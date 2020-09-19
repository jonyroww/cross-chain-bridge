import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class transferData1600528637696 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transfer_data',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp without time zone',
            isNullable: false,
            default: 'NOW()',
          },
          {
            name: 'addressFrom',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'addressTo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'fromNode',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'toNode',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'transactionId',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transfer_data');
  }
}
