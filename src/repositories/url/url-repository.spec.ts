import inMemoryDB from '../_test_/database'
import { UrlRepository } from './url-repository'

const makeSut = () => new UrlRepository(inMemoryDB)

describe('URL Repository', () => {
  beforeAll(async () => {
    return await inMemoryDB.migrate.latest()
  })

  afterAll(async () => {
    await inMemoryDB.migrate.rollback()
    return await inMemoryDB.destroy()
  })

  it('should return null if no url registry was found by the given hash', async () => {
    const sut = makeSut()

    const result = await sut.findByHash('any_hash')

    expect(result).toBeNull()
  })

  it('should return the correct url registry by the given hash', async () => {
    await inMemoryDB('urls').insert({
      id: null,
      hash: 'hash',
      url: 'http://url.com',
      expirationDate: '2021-03-01'
    })
    const sut = makeSut()

    const result = await sut.findByHash('hash')

    expect(result).toBeDefined()
    expect(result.url).toBe('http://url.com')
    expect(result.hash).toBe('hash')
    expect(result.expirationDate).toBe('2021-03-01')
  })

  it('should return the correct url registry by the given url', async () => {
    await inMemoryDB('urls').insert({
      id: null,
      hash: 'hash',
      url: 'http://url.com',
      expirationDate: '2021-03-01'
    })
    const sut = makeSut()

    const result = await sut.findByUrl('http://url.com')

    expect(result).toBeDefined()
    expect(result.url).toBe('http://url.com')
    expect(result.hash).toBe('hash')
    expect(result.expirationDate).toBe('2021-03-01')
  })

  it('should return the newly inserted url registry', async () => {
    const sut = makeSut()

    const result = await sut.save({
      hash: 'hash',
      url: 'http://url.com',
      expirationDate: '2021-03-01'
    })

    expect(result).toBeDefined()
    expect(result.url).toBe('http://url.com')
    expect(result.hash).toBe('hash')
    expect(result.expirationDate).toBe('2021-03-01')
  })

  it('should return true if the delete method succeeds', async () => {
    const [earlyAddedItemId] = await inMemoryDB('urls').insert({
      hash: 'hash',
      url: 'http://url.com',
      expirationDate: '2021-03-01'
    })

    const sut = makeSut()

    const result = await sut.delete(earlyAddedItemId)

    expect(result).toBe(true)
  })

  it('should return false if the method fails', async () => {
    const sut = makeSut()

    const result = await sut.delete(-1)

    expect(result).toBe(false)
  })
})
