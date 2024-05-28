import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import configuration from './configs/configs';
import { PostgresConnectService } from './postgres/postgres-connect.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    //PostgresModule,      1 варіант
    //2  варіант
    TypeOrmModule.forRootAsync({
      useClass: PostgresConnectService,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
