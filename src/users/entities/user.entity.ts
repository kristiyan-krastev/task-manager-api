import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../../tasks/entities/task.entity";

@Entity({name: 'users', synchronize: false})
export class User {
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'firstName'})
  firstName: string;

  @Column({name: 'lastName'})
  lastName: string;

  @ManyToMany(() => Task, task => task.users)
  task: Task;
}
