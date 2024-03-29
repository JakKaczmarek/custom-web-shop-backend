import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Images } from "./Images";
import { OrderBike } from "./OrderBike";

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

  @OneToMany(() => Images, (image) => image.bikes)
  srcArray?: Images[];

  @OneToMany(() => OrderBike, (orderBike) => orderBike.bike)
  orderBikes: OrderBike[] | undefined;
}
