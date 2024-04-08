export interface InputProps {
  value: string;
  disabled?: boolean;
}

export interface InputEmits {
  (e: 'update:value', update: string): void;
}

export const defaultInputProps: Pick<InputProps, 'disabled'> = {
  disabled: false
};