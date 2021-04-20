import request from 'supertest'
import { connectDatabase } from '../../resources/database'
import { app } from '../app'

const testBd = connectDatabase()

function getHash(urlRegistry: { url: string }) {
  return new URL(urlRegistry.url).pathname.split('/')[1]
}

describe('Shortener Route', () => {
  const targetUrl = 'http://google.com/search'
  let respBodyFromPost: Record<string, string>

  beforeAll(async () => {
    return await testBd.migrate.latest()
  })

  afterAll(async () => {
    await testBd.migrate.rollback()
    return await testBd.destroy()
  })

  describe('/encurtador', () => {
    test('POST: 200 response if has a valid payload', async () => {
      return request(app)
        .post('/encurtador')
        .send({ url: targetUrl })
        .expect(200)
        .then(request => {
          respBodyFromPost = request.body
          expect(request.body).toHaveProperty('url')
        })
    })

    test('POST: 200 response for duplicated payloads', async () => {
      return request(app)
        .post('/encurtador')
        .send({ url: targetUrl })
        .expect(200)
        .then(request => {
          const firstHash = getHash(respBodyFromPost as { url: string })
          const currentHash = getHash(request.body)

          expect(currentHash).toBe(firstHash)
        })
    })

    test('POST: 400 response if has an invalid payload', async () => {
      return request(app)
        .post('/encurtador')
        .send({ url: 'invalid_url.com' })
        .expect(400)
        .then(request => {
          expect(request.body).toEqual({
            field: 'url',
            error: 'Invalid URL format'
          })
        })
    })
  })

  describe('/:hash', () => {
    test('GET: 302 response with page redirect', async () => {
      const hash = getHash(respBodyFromPost as { url: string })

      return request(app)
        .get(`/${hash}`)
        .expect(302)
        .then(request => {
          expect(request.headers.location).toBe(targetUrl)
        })
    })

    test('GET: 404 response for an invalid hash', async () => {
      return request(app)
        .get('/invalid_hash')
        .expect(404)
        .then(request => {
          expect(request.body).toEqual({
            field: 'url',
            error: 'URL not found or expired'
          })
        })
    })
  })
})
