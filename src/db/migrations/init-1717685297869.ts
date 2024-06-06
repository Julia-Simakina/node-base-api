import { MigrationInterface, QueryRunner } from "typeorm";

export class init1717685297869 implements MigrationInterface {
  name = "init1717685297869";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "genre" ("id" SERIAL NOT NULL, "name" character varying, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "book" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "authorName" character varying NOT NULL, "cover" character varying NOT NULL, "paperBackPrice" double precision NOT NULL, "hardCoverPrice" double precision NOT NULL, "dateOfIssue" TIMESTAMP, "rating" integer, "status" character varying NOT NULL, "description" character varying NOT NULL, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, "dayOfBirth" TIMESTAMP, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cart" ("id" SERIAL NOT NULL, "bookId" integer NOT NULL, "userId" integer NOT NULL, "count" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "book_genres_genre" ("bookId" integer NOT NULL, "genreId" integer NOT NULL, CONSTRAINT "PK_75a197f32ed39286c5c39198ece" PRIMARY KEY ("bookId", "genreId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31d658e0af554165f4598158c5" ON "book_genres_genre" ("bookId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_83bd32782d44d9db3d68c3f58c" ON "book_genres_genre" ("genreId") `
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_15605eba0be4c6669389090dd15" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "book_genres_genre" ADD CONSTRAINT "FK_31d658e0af554165f4598158c55" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "book_genres_genre" ADD CONSTRAINT "FK_83bd32782d44d9db3d68c3f58c1" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book_genres_genre" DROP CONSTRAINT "FK_83bd32782d44d9db3d68c3f58c1"`
    );
    await queryRunner.query(
      `ALTER TABLE "book_genres_genre" DROP CONSTRAINT "FK_31d658e0af554165f4598158c55"`
    );
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`
    );
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_15605eba0be4c6669389090dd15"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_83bd32782d44d9db3d68c3f58c"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_31d658e0af554165f4598158c5"`
    );
    await queryRunner.query(`DROP TABLE "book_genres_genre"`);
    await queryRunner.query(`DROP TABLE "cart"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(`DROP TABLE "genre"`);
  }
}
