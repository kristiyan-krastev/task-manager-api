import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Task } from "../tasks/entities/task.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'example',
      port: 3306,
      username: 'example',
      password: 'example',
      database: 'example',
      entities: [
        User,
        Task
      ]
    }),
  ],
  exports: [
    TypeOrmModule
  ]
})
export class DatabaseModule {}
