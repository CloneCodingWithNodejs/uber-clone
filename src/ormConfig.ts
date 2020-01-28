import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const defaultConnectionOptions: ConnectionOptions = {
  type: 'postgres',
  database: 'uber',
  synchronize: true,
  logging: true,
  entities: ['entities/**/*.*'],
  host: process.env.DB_ENDPOINT,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

export default defaultConnectionOptions;
