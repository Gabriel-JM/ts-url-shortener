import { Request, Response } from 'express'
import { Controller, ControllerFunction, HttpRequest } from '../../protocols/infra'

export function ExpressRouterAdapter(controller: Controller) {
  function adapt(routerFunction: ControllerFunction) {
    return async (req: Request, res: Response) => {
      const { protocol, hostname } = req
      const port = hostname === 'localhost' ? ':'+process.env.PORT : ''

      const httpRequest = <HttpRequest> {
        address: `${protocol}://${hostname}${port}`,
        params: req.params,
        body: req.body
      }

      const { status, body } = await routerFunction.call(
        controller,
        httpRequest
      )

      const redirectData = body as { redirect: string }

      if(redirectData.redirect) {
        return res.redirect(redirectData.redirect)
      }

      res.status(status).json(body)
    } 
  }

  return adapt
}
