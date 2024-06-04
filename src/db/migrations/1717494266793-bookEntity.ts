import { MigrationInterface, QueryRunner } from "typeorm";

export class BookEntity1717494266793 implements MigrationInterface {
    name = 'BookEntity1717494266793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "genre" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "genre"`);
    }

}
