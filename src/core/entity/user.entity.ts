import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common';
@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'telegram_id',
    unique: true,
    nullable: true,
  })
  telegram_id: string;

  @Column({ type: 'varchar', name: 'full_name', nullable: true })
  full_name: string;

  @Column({ type: 'varchar', name: 'username', nullable: true })
  username: string;

  @Column({ type: 'varchar', name: 'phone_number', nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', name: 'lang', nullable: true })
  lang: string;
}
