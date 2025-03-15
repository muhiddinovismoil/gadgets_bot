import { Repository } from 'typeorm';
import { UserEntity } from 'src/core';
export type UserRepository = Repository<UserEntity>;
