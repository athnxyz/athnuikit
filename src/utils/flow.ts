type FlowFn<T, U> = (...args: T extends any ? any : never) => U;
type InferLast<T extends any[]> = T extends [ ...infer _, infer Last ] ? Last : never;


export const flow = <T extends FlowFn<any, any>[]>(...fns: T) => {
  return (...args: Parameters<T[0]>): ReturnType<InferLast<T>> => {
    return fns.reduce((acc, fn) => {
      const args = Array.isArray(acc) ? acc : [ acc ];
      return fn(...args);
    }, args)[0];
  };
};