export interface PathProps<T> {
  rootData: T;
  extractIdFn: (data: T) => string;
  extractPrevIdFn: (data: T) => string | null;
  extractLinkedNodes: (data: T) => string[] | null;
  selectDataFn: (id: string) => Promise<T>;
}