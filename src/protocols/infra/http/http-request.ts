export interface HttpRequest {
  address: string
  params: { [key: string]: string }
  body: object | object[]
}
