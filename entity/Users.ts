import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Orders } from "./Orders";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email?: string;

  @Column()
  password?: string;

  @Column()
  role?: string;

  @OneToMany((type) => Orders, (order) => order.user)
  orders: Orders[] | undefined;
}
