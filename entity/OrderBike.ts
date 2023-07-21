import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Orders } from "./Orders";
import { Bikes } from "./Bikes";

@Entity()
export class OrderBike {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  quantity!: number;

  @ManyToOne(() => Orders, (order) => order.orderBikes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order: Orders | undefined;

  @ManyToOne(() => Bikes, (bike) => bike.orderBikes)
  @JoinColumn({ name: "bike_id" })
  bike: Bikes | undefined;
}
