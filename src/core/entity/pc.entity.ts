import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity('admins')
export class PcEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'boolean' })
  delivery: boolean;

  @Column({ type: 'varchar' })
  store_username: string;

  @Column({ type: 'varchar' })
  phone_number: string;

  @Column({ type: "bigint" })
  processor: number;

  @Column({type:"bigint"})
  mother_board: number;

  @Column({type:"bigint"})

  new_column: number;

}
