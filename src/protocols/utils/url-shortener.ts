export interface IUrlShortener {
  shorten(url: string): Promise<string>
}
