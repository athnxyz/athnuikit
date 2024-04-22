export interface SearchContextMap {
  context: string;
  help?: string;
  filters: (string | number | boolean)[];
}

export interface UsedSearchContextMap {
  context: string;
  filters: Set<string>;
}

export interface SearchProps {
  text: string;
  onSubmit(text: string): Promise<boolean>;
  contextMap?: { [context: string]: SearchContextMap };
  placeholder?: string;
}

export interface SearchEmits {
  (e: 'update:text', text: string): void;
}

export const defaultSearchProps: Pick<SearchProps, 'text' | 'placeholder'> = {
  text: '',
  placeholder: 'begin typing to perform search...',
};