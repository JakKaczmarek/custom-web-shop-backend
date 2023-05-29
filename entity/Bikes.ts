import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Images } from "./Images.js";

@Entity()
export class Bikes {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  bikeName?: string;

  @Column()
  price?: number;

  @Column()
  category?: string;

  @Column()
  alt?: string;

  @Column()
  src?: string;

  @OneToMany((type) => Images, (image) => image.bikes)
  srcArray?: Images[];
}
