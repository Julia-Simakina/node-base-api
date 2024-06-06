import { MigrationInterface, QueryRunner } from "typeorm";

export class DateOfIssueNullable1717686514123 implements MigrationInterface {
    name = 'DateOfIssueNullable1717686514123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "dateOfIssue" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "dateOfIssue" DROP NOT NULL`);
    }

}
