import { DataSource, DataSourceOptions } from 'typeorm';


const dbConfig = {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgresqlabc$',
      database: 'postgres',
      entities: ['**/*.entity.js'],
      migrationsRun: true,
      autoLoadEntities: true,
      synchronize: false,
      migrations: [__dirname + '/migrations/*.ts'],
};

export default new DataSource(dbConfig as DataSourceOptions);