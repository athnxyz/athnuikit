export interface MasterViewProps<T, V> {
  keys: T[];
  selectedKey: T;
  extractKeyFn(keyObj: T): string;
  getDataFn(key: string): Promise<V>;
  keyViewStyle?: { [style: string]: string };
  // dataViewStyle?: { [style: string]: string };
}

export interface MasterViewEmits<T> {
  (e: 'update:selectedKey', selection: T): void
}

export const defaultKeyViewStyle: { [style: string]: string } = {
  'border-right': '2px solid var(--v-border)'
}