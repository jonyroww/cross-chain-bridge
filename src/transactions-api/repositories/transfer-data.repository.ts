import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { TransferData } from '../entities/transfer-data.entity';

@EntityRepository(TransferData)
export class TransferDataRepository extends BaseRepository<TransferData> {}
