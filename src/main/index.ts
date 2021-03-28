import 'dotenv-safe/config'
import { connectDatabase } from '../resources/database'
import { app } from './app'

const port = process.env.PORT || 3200

async function start() {
  let retries = 5
  while(retries) {
    try {
      const knexDB = connectDatabase()
      await knexDB.migrate.latest()

      return app.listen(port, () => {
        console.log(`Server Running at port ${port}`)
      })
    } catch(err) {
      console.error(err)
      retries--
      console.log(`Retries left: ${retries}`)
      await new Promise(res => setTimeout(res, 5000))
    }  
  }
}

start()
