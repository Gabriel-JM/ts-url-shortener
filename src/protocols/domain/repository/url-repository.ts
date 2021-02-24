import { Repository } from '../../infra/repository/repository'
import { IncomingUrl } from '../../models'

export interface IUrlRepository extends Repository<IncomingUrl> {
  findByHash(hash: string): Promise<IncomingUrl | null>
}
