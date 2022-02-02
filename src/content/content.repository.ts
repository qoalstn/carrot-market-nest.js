import { EntityRepository, Repository } from 'typeorm';
import { ContentEntity } from './entities/content.entity';

@EntityRepository(ContentEntity)
export class ContnetRepository extends Repository<ContentEntity> {}
