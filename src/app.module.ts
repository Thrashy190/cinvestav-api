import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CadetsModule } from './cadets/cadets.module';
import { UsersModule } from './users/users.module';
import { UploaderModule } from './uploader/uploader.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI,{dbName: process.env.DB_NAME}),
    MongooseModule,
    AuthModule,
    CadetsModule,
    UsersModule,
    UploaderModule,
  ],
})
export class AppModule {}
