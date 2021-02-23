export interface HttpRequest {
  params: { [key: string]: string }
  body: object | object[]
}
