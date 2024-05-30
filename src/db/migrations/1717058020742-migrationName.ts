import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName1717058020742 implements MigrationInterface {
    name = 'MigrationName1717058020742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "avatar" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "avatar" SET DEFAULT 'http://localhost:3000/public/defaultAvatar.png'`);
    }

}
