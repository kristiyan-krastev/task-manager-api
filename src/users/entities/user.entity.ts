import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users', synchronize: false})
export class User {
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'firstName'})
  firstName: string;

  @Column({name: 'lastName'})
  lastName: string;
}
