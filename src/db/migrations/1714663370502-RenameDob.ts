import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameDob1714663370502 implements MigrationInterface {
  name = "RenameDob1714663370502";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "dob" TO "dayOfBirth"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "dayOfBirth" TO "dob"`
    );
  }
}
