import { Repository } from '../../infra/repository/repository'
import { IncomingUrl, ShortenedUrl } from '../../models'

export interface IUrlRepository extends Repository<IncomingUrl, ShortenedUrl> {
  findByUrl(url: string): Promise<ShortenedUrl | null>
}
