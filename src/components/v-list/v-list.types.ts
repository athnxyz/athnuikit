export interface ListProps<T, V> {
  items: { key: T, content: V }[];
  extractKeyFn: (key: T) => string;
  icon?: string;
}