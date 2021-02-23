import { HttpRequest } from '../http/http-request'
import { HttpResponseData } from '../http/http-response-data'

export type ControllerFunction = (request: HttpRequest) => Promise<HttpResponseData>
