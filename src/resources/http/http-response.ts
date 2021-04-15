import {
  HttpErrorResponseDescription,
  HttpResponseData,
  HttpServerErrorDescription
} from '../../protocols/infra'

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

  static notFound(content: HttpErrorResponseDescription) {
    return <HttpResponseData> {
      status: 404,
      body: content
    }
  }

  static serverError(content: HttpServerErrorDescription) {
    if(process.env.SHOW_LOGS === 'true') {
      console.error('\n', content.error)
    }
    
    return <HttpResponseData> {
      status: 500,
      body: {
        field: content.field,
        error: content.error.message
      }
    }
  }
}
