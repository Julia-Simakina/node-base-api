import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameFullName1716364959213 implements MigrationInterface {
  name = "RenameFullName1716364959213";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "fullName" TO "name"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "name" TO "fullName"`
    );
  }
}
