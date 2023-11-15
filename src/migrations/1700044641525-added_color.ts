import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedColor1700044641525 implements MigrationInterface {
    name = 'AddedColor1700044641525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" ALTER COLUMN "color" SET DEFAULT 'red'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" ALTER COLUMN "color" SET DEFAULT 'white'`);
    }

}
