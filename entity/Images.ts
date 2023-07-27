import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Bikes } from "./Bikes";

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  path?: string;

  @Column()
  bikesId?: number;

  @ManyToOne(() => Bikes, (bike) => bike.srcArray)
  bikes?: Bikes[];
}
