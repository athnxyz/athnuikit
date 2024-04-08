export interface ButtonProps<T> {
  option: T;
  action: (option: T) => T;
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

export const defaultButtonProps: Pick<ButtonProps<any>, 'message' | 'color' | 'bgColor'> = {
  color: 'var(--v-text-primary-invert)',
  bgColor: 'var(--v-button)'
}