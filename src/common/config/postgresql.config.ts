export interface PostgresqlConfig {
  dialect: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  timezone: string;
  ssl: boolean;
  autoLoadEntities: boolean;
}
