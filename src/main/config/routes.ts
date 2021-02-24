import { Application } from 'express'
import shortenerRoutes from '../routes/shortener'

export default (app: Application) => {
  app.use(shortenerRoutes)
}
