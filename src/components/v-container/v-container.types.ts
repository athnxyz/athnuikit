export type ContainerProps = {
  orientation: 'vertical' | 'horizontal';
  border?: boolean;
  overflow?: 'hidden' | 'auto' | 'visible';
  style?: { [style: string]: string };
}

export const defaultContainerProps: Pick<ContainerProps, 'border' | 'overflow'> = {
  border: false,
  overflow: 'visible'
}