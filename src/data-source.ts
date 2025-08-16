/* eslint-disable @typescript-eslint/no-unsafe-argument */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as yaml from 'js-yaml';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
const currentDirectory = __dirname;

const YAML_CONFIG_FILENAME = '../configs/config.yml';

const data = yaml.load(
  readFileSync(join(currentDirectory, YAML_CONFIG_FILENAME), 'utf8')
);

export const AppDataSource = new DataSource({
  ...data.postgresql.main,
  entities: ['src/db/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
});
