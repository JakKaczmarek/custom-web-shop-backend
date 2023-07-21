import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Users } from "./Users";
import { Bikes } from "./Bikes";
import { OrderBike } from "./OrderBike"; // Import nowej encji OrderBike

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

  @OneToMany(() => OrderBike, (orderBike) => orderBike.order)
  orderBikes: OrderBike[] | undefined;

  @ManyToMany(() => Bikes) // Dodajemy relację many-to-many z encją Bikes
  @JoinTable({
    name: "orders_bikes", // Nazwa tabeli łączącej encje
    joinColumn: { name: "order_id", referencedColumnName: "id" }, // Klucz główny tabeli Orders
    inverseJoinColumn: { name: "bike_id", referencedColumnName: "id" }, // Klucz główny tabeli Bikes
  })
  bikes: Bikes[] | undefined;
}
