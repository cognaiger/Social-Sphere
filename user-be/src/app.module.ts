import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import base from "./modules/config/base.config"
import database from "./modules/config/database.config"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [base, database]
    }),
    AuthModule
  ],
})
export class AppModule {}
