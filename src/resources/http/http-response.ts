import { HttpResponseData } from '../../protocols/infra'
import { HttpErrorResponseDescription } from '../../protocols/infra/http/http-error-response-description'

export class HttpResponse {
  static ok(content: object | object[]) {
    return <HttpResponseData> {
      status: 200,
      body: content
    }
  }
  
  static badRequest(content: HttpErrorResponseDescription) {
    return <HttpResponseData> {
      status: 400,
      body: content
    }
  }

  static serverError(content: HttpErrorResponseDescription) {
    return <HttpResponseData> {
      status: 500,
      body: content
    }
  }
}
