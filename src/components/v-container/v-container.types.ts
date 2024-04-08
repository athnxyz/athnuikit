export type ContainerProps = {
  orientation: 'vertical' | 'horizontal';
  border?: boolean;
  hidden?: boolean;
  style?: { [style: string]: string };
}

export const defaultContainerProps: Pick<ContainerProps, 'border' | 'hidden'> = {
  border: false,
  hidden: true
}