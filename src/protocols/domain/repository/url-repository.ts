import { Repository } from '../../infra/repository/repository'
import { IncomingUrl, ShortenedUrl } from '../../models'

export interface IUrlRepository extends Repository<IncomingUrl, ShortenedUrl> {
  findByHash(hash: string): Promise<IncomingUrl | null>
}
