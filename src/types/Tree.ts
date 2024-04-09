export interface Node<T> {
  id:  string;
  data: T;
  children: { [childId: string]: () => Promise<Node<T>> };
}