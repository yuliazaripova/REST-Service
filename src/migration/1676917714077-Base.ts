import { MigrationInterface, QueryRunner } from 'typeorm';

export class Base1676917714077 implements MigrationInterface {
  name = 'Base1676917714077';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying(300) NOT NULL, "password" character varying(300) NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying, "trackId" uuid, "albumId" uuid, "artistId" uuid, CONSTRAINT "REL_fff1e5268afe3d8dee925dc9d2" UNIQUE ("trackId"), CONSTRAINT "REL_ca84d437258a999012f200fa4a" UNIQUE ("albumId"), CONSTRAINT "REL_ee83b1c50baa5050d57b3606c8" UNIQUE ("artistId"), CONSTRAINT "PK_2fde25c80bd089c0fa0e7986409" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fa1df76071c75839efb29b6469" ON "favs" ("type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "duration" integer NOT NULL, "artistId" uuid, "albumId" uuid, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "grammy" boolean, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs" ADD CONSTRAINT "FK_fff1e5268afe3d8dee925dc9d29" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs" ADD CONSTRAINT "FK_ca84d437258a999012f200fa4a9" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs" ADD CONSTRAINT "FK_ee83b1c50baa5050d57b3606c83" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs" DROP CONSTRAINT "FK_ee83b1c50baa5050d57b3606c83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs" DROP CONSTRAINT "FK_ca84d437258a999012f200fa4a9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs" DROP CONSTRAINT "FK_fff1e5268afe3d8dee925dc9d29"`,
    );
    await queryRunner.query(`DROP TABLE "artist"`);
    await queryRunner.query(`DROP TABLE "track"`);
    await queryRunner.query(`DROP TABLE "album"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fa1df76071c75839efb29b6469"`,
    );
    await queryRunner.query(`DROP TABLE "favs"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
