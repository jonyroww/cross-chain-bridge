import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class transferResponse1600774778184 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transfer_data',
      new TableColumn({
        name: 'transferResponse',
        type: 'jsonb',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transfer_data', 'transferResponse');
  }
}
