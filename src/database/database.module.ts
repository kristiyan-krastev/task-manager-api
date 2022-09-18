import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'example',
      port: 3306,
      username: 'example',
      password: 'example',
      database: 'example',
      entities: [User]
    }),
  ],
  exports: [
    TypeOrmModule
  ]
})
export class DatabaseModule {}
