import { ControllerFunction } from './controller-function'

export interface Controller {
  show: ControllerFunction
  create: ControllerFunction
}
