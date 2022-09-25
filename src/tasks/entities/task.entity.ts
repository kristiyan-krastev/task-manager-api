import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity({name: 'tasks', synchronize: false})
export class Task {
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'title'})
  title: string;

  @Column({name: 'description'})
  description: string;

  @ManyToMany(() => User, user => user.task, {
    cascade: true
  })
  @JoinTable({
    name: "users_tasks",
    joinColumn: {
      name: "userId", referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "taskId"
    }
  })
  users: User[];

  public addUser(user: User): void {
    if(this.users == null) {
      this.users = new Array<User>();
    }
    this.users.push(user);
  }
}
