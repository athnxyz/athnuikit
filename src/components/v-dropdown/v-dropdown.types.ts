import type { ButtonProps } from '@uikit/components/v-button/v-button.types';


type DropdownButtonProps = Omit<ButtonProps<any>, 'option' | 'action'>;

export interface DropdownOption {
  label: string;
  action: () => Promise<void>;
  icon?: string;
}

export interface DropdownProps {
  button: DropdownButtonProps;
  options: DropdownOption[];
}

export interface DropdownEmits<T> {
  (e: 'update:options', selected: DropdownOption): void;
}