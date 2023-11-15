import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedColor1700044506276 implements MigrationInterface {
    name = 'AddedColor1700044506276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" ADD "color" character varying NOT NULL DEFAULT 'white'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "color"`);
    }

}
