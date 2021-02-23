import { Repository } from '../../infra/repository/repository'
import { ShortenedUrl } from '../../models'

export interface IUrlRepository extends Repository<ShortenedUrl> {
  findByUrl(url: string): Promise<ShortenedUrl | null>
}
