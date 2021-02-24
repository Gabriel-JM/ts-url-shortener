import { Router } from 'express'
import { ExpressRouterAdapter } from '../adapters/express-router-adapter'
import { compose } from '../composers/url-controller-composer'

const router = Router()

const urlController = compose()
const adapt = ExpressRouterAdapter(urlController)

router.post('/encurtador', adapt(urlController.create))
router.get('/:hash', adapt(urlController.show))

export default router
