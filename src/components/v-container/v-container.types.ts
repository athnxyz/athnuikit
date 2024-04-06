export interface ContainerProps {
  orientation: 'vertical' | 'horizontal';
  border?: boolean;
  effects?: string[];
  style?: { [style: string]: string };
}