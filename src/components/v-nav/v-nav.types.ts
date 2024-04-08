import type { TitleProps } from '@uikit/components/v-title/v-title.types';


interface NavTitle extends TitleProps {
  icon?: string;
}

export interface NavProps {
  title: NavTitle;
  routerLinks: { path: `/${string}`, label: string }[];
  style?: { [style: string]: string };
}