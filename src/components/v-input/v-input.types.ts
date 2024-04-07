export interface InputProps {
  value: string;
  disabled: boolean;
}

export interface InputEmits {
  (e: 'update:value', update: string): void;
}