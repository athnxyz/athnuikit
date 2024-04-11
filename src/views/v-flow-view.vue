<script setup lang="ts">
import { ref } from 'vue';


const useFlowDetailsList = ref([
  { key: '<(...args: any[]): any>[]', content: 'a set of functions to operate on' },
]);

const useFlowImpl = ref(`
import { flow } from '@uikit/utils/flow';

const add = (x: number, y: number): number => x + y;
const square = (x: number): number => x * x;
const positive = (x: number): boolean => x > 0;

const flowFn = flow(add, square, positive); // return type will be true
const result = flowFn(1, 2); // expects args for first function, the rest of functions take in results of last
console.log(result); // result will be true
`);

const flowFnSignatureImpl = ref(`
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
`);
</script>

<template>
  
  <v-container orientation="vertical" overflow="auto">

    <v-container orientation="vertical" border>
      <v-title title="vflow"></v-title>
      <v-list 
        :items="useFlowDetailsList"
        :extractKeyFn="(key: string) => key">

        <template #key="{ key }">
          {{ key }}
        </template>

        <template #content="{ content }">
          {{  content  }}
        </template>

      </v-list>

      <v-input v-model:value="useFlowImpl" disabled></v-input>
      <v-input v-model:value="flowFnSignatureImpl" disabled></v-input>

    </v-container>

  </v-container>

</template>

<style lang="scss">
@import '@uikit/views/view.scss';
</style>