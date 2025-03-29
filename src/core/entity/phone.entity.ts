import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity('phone')
export class PhoneEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'model', nullable: true })
  model: string;

  @Column({ type: 'int', name: 'price', nullable: true })
  price: number;

  @Column({ type: 'varchar', name: 'memory', nullable: true })
  memory: string;

  @Column({ type: 'boolean', name: 'delivery', nullable: true })
  delivery: boolean;

  @Column({ type: 'boolean', name: 'exchange', nullable: true })
  exchange: boolean;

  @Column({ type: 'varchar', name: 'phone_number', nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', name: 'region', nullable: true })
  region: string;

  @Column({ type: 'varchar', name: 'battery', nullable: true })
  battery: string;

  @Column({ type: 'varchar', name: 'condition', nullable: true })
  condition: string;

  @Column({ type: 'boolean', name: 'document', nullable: true })
  document: boolean;

  @Column({ type: 'jsonb', name: 'images', nullable: true })
  images: string[];
}
