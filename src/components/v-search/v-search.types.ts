
export interface SearchContextMap<T extends string> {
  context: T;
  help?: string;
  getAvailableFilters(): Promise<(string | number | boolean)[]>;
}

export interface SearchProps<T extends string> {
  text: string;
  onSubmit(text: string): Promise<boolean>;
  contextMap?: { [context in T]: SearchContextMap<T> };
  placeholder?: string;
}

export interface SearchEmits {
  (e: 'update:text', text: string): void;
}

export const defaultSearchProps: Pick<SearchProps<any>, 'text' | 'placeholder'> = {
  text: '',
  placeholder: 'begin typing to perform search...',
};