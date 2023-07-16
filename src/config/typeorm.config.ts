import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isTestEnvironment = process.env.NODE_ENV === 'test';
    const isDevEnvironment = process.env.NODE_ENV === 'development';
    const isProdEnvironment = process.env.NODE_ENV === 'production';

    return {
      type: 'sqlite', // Change this to 'postgres' or your desired production database type
      synchronize: isTestEnvironment || isDevEnvironment, // Synchronize in test and development, but not in production
      database: this.configService.get<string>('DATABASE_NAME'),
      autoLoadEntities: true,
      migrationsRun: isProdEnvironment, // Set to true in production mode
      keepConnectionAlive: isTestEnvironment,
      entities: ['**/*.entity.ts'],
      migrations: [__dirname + '/migrations/*.ts'],
    };
  }
}
