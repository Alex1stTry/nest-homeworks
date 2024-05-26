import * as process from 'process';

import { Config } from './configs.type';

export default (): Config => ({
  app: {
    port: parseInt(process.env.APP_PORT) || 3000,
    host: process.env.APP_HOST || '0.0.0.0',
  },
  database: {
    port: parseInt(process.env.POSTGRES_PORT) || 5433,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_PORT,
    password: process.env.POSTGRES_PORT,
    dbName: process.env.POSTGRES_DB,
  },
  redis: {
    port: parseInt(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
});