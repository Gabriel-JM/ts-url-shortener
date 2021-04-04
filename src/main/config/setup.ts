import express, { Application } from 'express'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import swaggerDocs from '../../../swagger.json'

export default (app: Application) => {
  app.use(express.json())
  app.use(cors({
    origin: 'http://localhost:3500'
  }))
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
}
