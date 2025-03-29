import { Repository } from 'typeorm';
import { PcEntity } from '../entity';

export type PcRepository = Repository<PcEntity>;
