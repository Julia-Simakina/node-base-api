import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName1716190715819 implements MigrationInterface {
    name = 'MigrationName1716190715819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "fullName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dayOfBirth" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dayOfBirth" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "fullName" SET NOT NULL`);
    }

}
