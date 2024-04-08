<script setup lang="ts">
import { ref } from 'vue';


const useDebounceDetailsList = ref([
  { key: 'actionFn: T extends (...args: any[]) => any', content: 'the operation to debounce' },
  { key: 'delay: number', content: 'the debounce period in ms' }
]);

const useDebounceImpl = `
import { useDebounce } from '@uikit/composables/useDebounce';

// debounce is the debounce wrapper function for the operation
const { debounce } = useDebounce<(arg: T) => void>(); // arg is T for demo purposes

const action = (arg: T) => { /* the operation to perform */ };
const debounceAction = debounce(action, 200); // delay of 200ms
`;

const useScrollLoaderDetailsList = ref([
  { key: 'loadPageFn: (page: number) => Promise<T[]>', content: 'asynchronous page load function' },
  { key: 'scrollableElementRef: Ref<HTMLElement | null>', content: 'the scrollable html element to load content in' }
]);

const useScrollLoaderImpl = `
import { useScrollLoader } from '@uikit/composables/useScrollLoader';

const scrollElRef = ref(null); // the html element, use ref binding in component
const loadDataFn = async (page: number) => { /* paginate function */ };

/*
  items exposes a ref for the current page data
  loading exposes a ref for loading state
  error exposes a ref for Error objects on data load failure
*/
const { items, loading, error } = useScrollLoader(loadDataFn, scrollElRef);
`;
</script>

<template>
  
  <v-container orientation="vertical">

    <v-container orientation="vertical" border>
      <v-title title="useDebounce"></v-title>
      <v-list :items="useDebounceDetailsList"></v-list>
      <v-input v-model:value="useDebounceImpl" disabled></v-input>
    </v-container>

    <v-container orientation="vertical" border>
      <v-title title="usescrollloader"></v-title>
      <v-list :items="useScrollLoaderDetailsList"></v-list>
      <v-input v-model:value="useScrollLoaderImpl" disabled></v-input>
    </v-container>
  
  </v-container>

</template>

<style lang="scss">
@import '@uikit/views/view.scss';
</style>