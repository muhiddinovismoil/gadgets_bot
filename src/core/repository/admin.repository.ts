import { Repository } from 'typeorm';
import { AdminEntity } from 'src/core';
export type AdminRepository = Repository<AdminEntity>;
