import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from './utils/validateEnv';
import  User from './models/User'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});