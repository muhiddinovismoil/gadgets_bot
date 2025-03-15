import { Repository } from "typeorm";
import { UserEntity } from "../entity";

export type UserRepository = Repository<UserEntity>;