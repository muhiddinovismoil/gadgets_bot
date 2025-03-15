import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common';
@Entity('admin')
export class AdminEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'telegram_id', nullable: true })
  telegram_id: string;

  @Column({ type: 'varchar', name: 'username', nullable: true })
  username: string;

  @Column({ type: 'varchar', name: 'full_name', nullable: true })
  full_name: string;
}
