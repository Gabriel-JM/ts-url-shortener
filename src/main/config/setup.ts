import express, { Application } from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerDocs from '../../../swagger.json'

export default (app: Application) => {
  app.use(express.json())
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
}
