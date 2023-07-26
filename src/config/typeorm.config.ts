import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
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
          host: this.configService.get<string>('DATABASE_HOST'),
          port: this.configService.get<number>('DATABASE_PORT'),
          username: this.configService.get<string>('DATABASE_USERNAME'),
          password: this.configService.get<string>('DATABASE_PASSWORD'),
          database: this.configService.get<string>('DATABASE_NAME'),
          entities: ['**/*.entity.js'],
          migrationsRun: true,
          autoLoadEntities: true,
          synchronize: false,
          migrations: [__dirname + '/migrations/*.ts'],
        });
        break;
      default:
        throw new Error('unknown environment');
    }

    return dbConfig;
  }
}
