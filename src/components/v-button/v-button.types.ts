export interface ButtonProps<T> {
  option: T;
  action: (option: T) => T;
  debounce?: number;
  icon?: string;
  message?: string;
  color?: string;
  bgColor?: string;
  boxShadow?: string;
  fontSize?: string;
  overrideBtnClass?: string;
}

export interface ButtonEmits<T> {
  (e: 'update:option', updatedOption: T): void;
}

export const defaultButtonProps: Pick<ButtonProps<any>, 'debounce' | 'color' | 'bgColor'> = {
  debounce: 200,
  color: 'var(--v-text-primary-invert)',
  bgColor: 'var(--v-button)'
};