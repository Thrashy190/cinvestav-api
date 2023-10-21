import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CadetsModule } from './cadets/cadets.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { HashService } from './utils/hash/hash.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI, { dbName: process.env.DB_NAME }),
    JwtModule,
    MongooseModule,
    AuthModule,
    CadetsModule,
    UsersModule,
    FilesModule,
  ],
  providers: [HashService],
})
export class AppModule {}
