import type { ButtonProps } from '@uikit/components/v-button/v-button.types';
import { defaultButtonProps } from '@uikit/components/v-button/v-button.types';


type DropdownButtonProps = Omit<ButtonProps<boolean>, 'option' | 'action'>;

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

export const defaultDropdownProps: { button: DropdownButtonProps } = {
  button: defaultButtonProps as DropdownButtonProps
};