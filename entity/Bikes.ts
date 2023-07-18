import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Images } from "./Images.js";
import { Orders } from "./Orders.js";

@Entity()
export class Bikes {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  bike_name?: string;

  @Column()
  price?: number;

  @Column()
  category?: string;

  @Column()
  alt?: string;

  @Column()
  src?: string;

  @ManyToMany(() => Orders, (order) => order.bikes)
  orders: Orders[] | undefined;

  @OneToMany((type) => Images, (image) => image.bikes)
  srcArray?: Images[];
}
