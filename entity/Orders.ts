import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
