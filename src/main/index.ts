import 'dotenv-safe/config'
import { connectDatabase } from '../resources/database'
import { app } from './app'

const knexDB = connectDatabase()
const port = process.env.PORT || 3200

knexDB
  .migrate
  .latest()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Running at port ${port}`)
    })
  })
  .catch(err => {
    console.log('Initializing error...')
    console.error(err)
  })
;
