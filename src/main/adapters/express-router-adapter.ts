import { Request, Response } from 'express'
import { Controller, ControllerFunction, HttpRequest } from '../../protocols/infra'

export function ExpressRouterAdapter(controller: Controller) {
  function adapt(routerFunction: ControllerFunction) {
    return async (req: Request, res: Response) => {
      const httpRequest = <HttpRequest> {
        params: req.params,
        body: req.body
      }

      const { status, body } = await routerFunction.apply(
        controller,
        [httpRequest]
      )

      res.status(status).json(body)
    } 
  }

  return adapt
}
