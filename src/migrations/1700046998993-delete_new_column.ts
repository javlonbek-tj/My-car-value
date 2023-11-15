import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteNewColumn1700046998993 implements MigrationInterface {
    name = 'DeleteNewColumn1700046998993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "new"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" ADD "new" boolean NOT NULL DEFAULT true`);
    }

}
