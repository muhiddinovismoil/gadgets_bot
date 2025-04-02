import { BaseEntity } from 'src/common';
import { Pcenum } from 'src/common/enum/pc.enum';
import { Column, Entity } from 'typeorm';

@Entity('pc')
export class PcEntity extends BaseEntity {
  @Column({ type: 'enum', enum: Pcenum })
  type: Pcenum;

  @Column({ type: 'varchar' })
  model: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'boolean' })
  delivery: boolean;

  @Column({type:'varchar',nullable:false})
  ram:string;

  @Column({type:'varchar',nullable:false})
  memory:string;

  @Column({ type: 'varchar' })
  phone_number: string;

  @Column({ type: 'bigint' })
  processor: number;


  @Column({type:'varchar',nullable:false})
  monitor_duym:string

  @Column({ type: 'bigint' })
  mother_board: number;

  @Column({ type: 'bigint' })
  new_column: number;
}
