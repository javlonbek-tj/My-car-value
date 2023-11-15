import { MigrationInterface, QueryRunner } from "typeorm";

export class NewColumnDefaultValue1699869443253 implements MigrationInterface {
    name = 'NewColumnDefaultValue1699869443253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" ALTER COLUMN "new" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" ALTER COLUMN "new" DROP DEFAULT`);
    }

}
