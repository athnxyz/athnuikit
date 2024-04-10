import type { ButtonProps } from '@uikit/components/v-button/v-button.types';


type SidebarButtonProps = Omit<ButtonProps<any>, 'option' | 'action'>;

export interface SidebarProps {
  button: SidebarButtonProps;
  position?: 'left' | 'right';
}

export const defaultSidebarProps: Pick<SidebarProps, 'position'> = {
  position: 'right'
};