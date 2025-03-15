import { Repository } from "typeorm";
import { PhoneEntity } from "../entity";

export type PhoneRepository = Repository<PhoneEntity>;