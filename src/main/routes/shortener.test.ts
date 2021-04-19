import request from 'supertest'
import { connectDatabase } from '../../resources/database'
import { app } from '../app'

const testBd = connectDatabase()

describe('Shortener Route', () => {

  beforeAll(async () => {
    return await testBd.migrate.latest()
  })

  afterAll(async () => {
    await testBd.migrate.rollback()
    return await testBd.destroy()
  })

  describe('/encurtador', () => {
    test('post', async () => {
      return request(app)
        .post('/encurtador')
        .send({ url: 'http://google.com/search' })
        .expect(200)
        .then(req => {
          expect(req.body).toHaveProperty('url')
        })
    })
  })
})
