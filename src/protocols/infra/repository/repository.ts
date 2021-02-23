export interface Repository<TEntry, TReturn = TEntry> {
  save(content: TEntry): Promise<TReturn>
}
