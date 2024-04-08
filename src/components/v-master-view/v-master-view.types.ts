export interface MasterViewProps<T, V> {
  selectedKey: T;
  loadKeysFn(page: number): Promise<T[]>;
  extractKeyFn(keyObj: T): string;
  getDataFn(key: string): Promise<V>;
  viewWidths?: { keyView: string, dataView: string };
}

export interface MasterViewEmits<T> {
  (e: 'update:selectedKey', selection: T): void
}

export const defaultKeyViewStyle: { [style: string]: string } = {
  'border-right': '2px solid var(--v-border)'
}

export const defaultViewWidths: { keyView: string, dataView: string } = {
  keyView: '40%',
  dataView: '60%'
};