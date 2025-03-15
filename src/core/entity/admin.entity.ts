import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity('admins')
export class AdminEntity extends BaseEntity {

  @Column({type:"varchar"})
    telegram_id:string

    @Column({type:"varchar"})
    username:string

    @Column({type:"varchar"})
    full_name:string

}
