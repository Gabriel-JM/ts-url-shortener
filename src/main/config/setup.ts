import express, { Application } from 'express'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import swaggerDocs from '../../../swagger.json'

export default (app: Application) => {
  app.use(express.json())
  app.use(cors({
    origin: process.env.WEB_URL,
    methods: 'OPTIONS, GET, POST',
    maxAge: 86400
  }))
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
}
