/* eslint-disable no-console */
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'node:fs';
import * as path from 'node:path';

export class InitializeDatabase1692183200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Log that the migration is starting
    console.log('Running database initialization script...');

    // Construct the full path to the init.sql file
    const filePath = path.join(__dirname, 'init.sql');

    // Read the entire SQL file
    const sql = fs.readFileSync(filePath, { encoding: 'utf8' });

    // Execute the SQL script
    // Note: This executes the entire file as a single query.
    // This works for PostgreSQL but might require splitting statements for other drivers.
    await queryRunner.query(sql);

    console.log('Database initialization script finished.');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // The 'down' migration should reverse the 'up' migration.
    // Here, we'll drop the tables in reverse order of creation to respect foreign keys.
    console.log('Reverting database initialization...');

    await queryRunner.query(`DROP TABLE IF EXISTS "answers" CASCADE;`);
    await queryRunner.query(
      `DROP TABLE IF EXISTS "pattern_instances" CASCADE;`
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "examples" CASCADE;`);
    await queryRunner.query(
      `DROP TABLE IF EXISTS "pattern_templates" CASCADE;`
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "courses" CASCADE;`);

    // Also drop the trigger function and the extension if desired
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS update_updated_at_column;`
    );
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp";`);

    console.log('Reversion finished.');
  }
}
