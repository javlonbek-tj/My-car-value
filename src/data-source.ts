import { DataSource, DataSourceOptions } from 'typeorm';

const isTestEnvironment = process.env.NODE_ENV === 'test';
const isProdEnvironment = process.env.NODE_ENV === 'production';

const dataSourceOptions: DataSourceOptions = isTestEnvironment
  ? {
      type: 'sqlite',
      database: 'test.sqlite',
    }
  : isProdEnvironment
  ? {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['**/*.entity.ts'],
      migrations: [__dirname + '/migrations/*.ts'],
    }
  : {
      type: 'sqlite',
      database: 'db.sqlite',
    };

export const appDataSource = new DataSource(dataSourceOptions);
