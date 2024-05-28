import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path from 'path';
import * as process from 'process';

import { Config, DatabaseConfig } from '../configs/configs.type';

@Injectable()
export class PostgresConnectService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const databaseConfig = this.configService.get<DatabaseConfig>('database');
    return {
      type: 'postgres',
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.user,
      password: databaseConfig.password,
      database: databaseConfig.dbName,
      entities: [
        path.join(process.cwd(), 'dist', 'database', 'entities', '*.entity.js'),
      ],
      migrations: [
        path.join(process.cwd(), 'dist', 'database', 'migrations', '*.js'),
      ],
      synchronize: false,
    };
  }
}