import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `.env.${process.env.NODE_ENV}`,
});
const configService = new ConfigService();


const dbConfig: DataSourceOptions = {
      type: 'postgres',
      host: configService.get<string>('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      username: configService.get<string>('DATABASE_USERNAME'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_NAME'),
      entities: ['**/*.entity.js'],
      migrationsRun: true,
      synchronize: false,
      migrations: [__dirname + '/migrations/*.ts'],
};

export default new DataSource(dbConfig);