import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const dbConfig = {
      synchronize: false,
      migrations: [__dirname + '/migrations/*.ts'],
      migrationsRun: true,
      autoLoadEntities: true,
    };

    switch (process.env.NODE_ENV) {
      case 'development':
        Object.assign(dbConfig, {
          type: 'sqlite',
          database: 'db.sqlite',
          entities: ['**/*.entity.js'],
        });
        break;
      case 'test':
        Object.assign(dbConfig, {
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
        });
        break;
      default:
        throw new Error('unknown environment');
    }

    return dbConfig;
  }
}
