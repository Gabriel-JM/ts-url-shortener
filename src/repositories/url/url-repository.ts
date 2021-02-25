import Knex from 'knex'
import { IUrlRepository } from '../../protocols/domain'
import { IncomingUrl } from '../../protocols/models'

export class UrlRepository implements IUrlRepository {
  constructor(
    private readonly knex: Knex<IncomingUrl>
  ) {}

  async findByHash(hash: string) {
    const [urlRegistry] = await this.knex('urls').where({ hash })

    return urlRegistry || null
  }

  async save(urlRegistry: IncomingUrl) {
    const [insertedId] = await this.knex('urls')
      .insert(urlRegistry)
      .returning('*')
    ;
    
    const [url] = await this.knex('urls')
      .where('id', insertedId.id || Number(insertedId))
    ;

    return url
  }
}
