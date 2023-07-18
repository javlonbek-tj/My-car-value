import { DataSource, DataSourceOptions } from 'typeorm';


const dbConfig = {};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      synchronize: true,
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      synchronize: true,
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password123',
      database: 'mydatabase',
      entities: ['**/*.entity.js'],
      synchronize: false,
      migrations: [__dirname + '/migrations/*.js'],
    });
    break;
  default:
    throw new Error('unknown environment');
}

export default new DataSource(dbConfig as DataSourceOptions);