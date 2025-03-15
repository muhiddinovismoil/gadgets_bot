import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {

  @Column({type:"varchar"})
    telegram_id:string

    @Column({type:"varchar"})
    username:string

    @Column({type:"varchar"})
    full_name:string

    @Column({type:"varchar" ,unique:true})
    phone_number:string
}
