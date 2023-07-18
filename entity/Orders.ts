import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Users } from "./Users";
import { Bikes } from "./Bikes";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name?: string;

  @Column()
  email?: string;

  @Column()
  shipping_address?: string;

  @Column()
  total_amount?: number;

  @Column()
  country?: string;

  @Column()
  city?: string;

  @Column()
  phone?: string;

  @Column()
  postal_code?: string;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => Users, (user: Users) => user.orders)
  @JoinColumn({ name: "user_id" })
  user: Users | undefined;

  @ManyToMany(() => Bikes)
  @JoinTable({
    name: "orders_bikes",
    joinColumn: { name: "order_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "bike_id", referencedColumnName: "id" },
  })
  bikes: Bikes[] | undefined;
}
