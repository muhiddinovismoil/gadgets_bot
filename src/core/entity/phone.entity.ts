import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity('phone')
export class PhoneEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  model: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar' })
  memory: string;

  @Column({ type: 'boolean' })
  delivery: boolean;

  @Column({ type: 'boolean' })
  exchange: boolean;

  @Column({ type: 'varchar' })
  phone_number: string;

  @Column({ type: 'varchar' })
  region: string;

  @Column({ type: 'varchar' })
  battery: string;

  @Column({ type: 'varchar' })
  condition: string;

  @Column({ type: 'boolean' })
  document: boolean;
}
