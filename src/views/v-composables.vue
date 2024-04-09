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

const useExpBackoffDetailsList = ref([
  { key: 'fn: T extends (...args: any[]) => any', content: 'the operation to retry on failures' },
  { key: 'retries: number', content: 'the number of retries to attempt' }
]);

const useExpBackoffImpl = `
import { useExponentialBackoff } from '@uikit/composables/useExponentialBackoff';

/*
  backoff is the backoff wrapper function for the operation
  backoffErr exposes a ref for Error objects on max retries load failure
*/
const { backoff, backoffErr } = useExponentialBackoff<(arg: T) => Promise<void>>(); // arg is T for demo purposes

const action = async (arg: T) => { /* the operation to perform */ };
const backoffAction = backoff(action, 5); // 5 total retries
`;

const useLocalStorageDetailsList = ref([
  { key: 'prefix: PRF extends string', content: 'the prefix for the key' },
  { key: 'key: KEY extends string', content: 'the key' },
  { key: 'value: string', content: 'the stringified value for a given key' }
]);

const useLocalStorageImpl = `
import { useLocalStorage } from '@uikit/composables/useLocalStorage';

/*
  localStorageRef exposes ref to localstorage
  updateValueForKeyMap exposes ref for signalling updated keys in localstorage
  setItem(prefix, key, value) is a wrapper function to set a key value pair in localstorage
  getItem(prefix, key): value is a wrapper function to get a key value pair in localstorage
  deleteItem(prefix, key) is a wrapper function to delete a key value pair in localstorage
  clear() is a wrapper function to clear localstorage
*/
const { localStorageRef, updateValueForKeyMap, setItem, getItem, deleteItem, clear } = useLocalStorage<T, V>();
`;

const usePathDataLoaderDetailsList = ref([
  { key: 'rootData: T', content: 'the root data of the path' },
  { key: 'extractIdFn: (data: T) => string', content: 'function to extract key from data' },
  { key: 'extractPrevIdFn: (data: T) => string | null', content: 'function to extract reference to previous node in path' },
  { key: 'extractLinkedNodes: (data: T) => string[] | null', content: 'function to extract references to possible next path' },
  { key: 'selectDataFn: (id: string) => Promise<T>', content: 'function to asynchronously load data for next node in path' },
]);

const usePathDataLoaderImpl = `
import { usePathDataLoader} from '@uikit/composables/usePathDataLoader';

const rootData = ref<T>(/* needs to be populated, make network request or other op */);
const extractIdFn = (data: T) => { /* get identifier from data object */ };
const extractPrevIdFn = (data: T) => { /* get reference id from current data object for previous */ };
const extractLinkedNodes = (data: T) => { /* get references to potential child objects */ };
const selectDataFn = async = (id: string) => { /* fetch selected data asynchronously */ };

/*
  path exposes ref to entire current path as Ref<PathNode<T>[]>
  currNode exposes ref to current selected data
  pathLoading exposes ref to loading state of data
  pathErr exposes a ref for Error objects on max retries load failure
  selectNode(selectedId) is a wrapper function to update path state on interaction
*/
const { path, currNode, pathLoading, pathErr, selectNode } = usePathDataLoader(
  rootData, extractIdFn, extractPrevIdFn, extractLinkedNodes, selectDataFn
);
`;

const usePeriodicDataFetchDetailsList = ref([
  { key: 'fetcher: Ref<(() => Promise<T>) | undefined>', content: 'the data fetch function' },
  { key: 'timespanInMs: number', content: 'the length of time for a period' }
]);

const usePeriodicDataFetchImpl = `
import { usePeriodicDataFetch } from '@uikit/composables/usePeriodicDataFetch';

const fetcher = (): Promise<T> => { /* perform operation here */ };
/*
  data exposes ref to updated data
  loading exposes ref to loading state
  periodicError exposes a ref for Error objects on data fetch failures
*/
const { data, loading, periodicError } = usePeriodicDataFetch(fetcher, 500); // period of 500ms
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
  scrollError exposes a ref for Error objects on data load failure
*/
const { items, loading, scrollError } = useScrollLoader(loadDataFn, scrollElRef);
`;
</script>

<template>
  
  <v-container orientation="vertical" overflow="auto">

    <v-container orientation="vertical" border>
      <v-title title="useDebounce"></v-title>
      <v-list :items="useDebounceDetailsList"></v-list>
      <v-input v-model:value="useDebounceImpl" disabled></v-input>
    </v-container>

    <v-container orientation="vertical" border>
      <v-title title="useExponentialBackoff"></v-title>
      <v-list :items="useExpBackoffDetailsList"></v-list>
      <v-input v-model:value="useExpBackoffImpl" disabled></v-input>
    </v-container>

    <v-container orientation="vertical" border>
      <v-title title="useLocalStorage"></v-title>
      <v-list :items="useLocalStorageDetailsList"></v-list>
      <v-input v-model:value="useLocalStorageImpl" disabled></v-input>
    </v-container>

    <v-container orientation="vertical" border>
      <v-title title="usePathDataLoader"></v-title>
      <v-list :items="usePathDataLoaderDetailsList"></v-list>
      <v-input v-model:value="usePathDataLoaderImpl" disabled></v-input>
    </v-container>

    <v-container orientation="vertical" border>
      <v-title title="usePeriodicDataFetcher"></v-title>
      <v-list :items="usePeriodicDataFetchDetailsList"></v-list>
      <v-input v-model:value="usePeriodicDataFetchImpl" disabled></v-input>
    </v-container>

    <v-container orientation="vertical" border>
      <v-title title="useScrollLoader"></v-title>
      <v-list :items="useScrollLoaderDetailsList"></v-list>
      <v-input v-model:value="useScrollLoaderImpl" disabled></v-input>
    </v-container>
  
  </v-container>

</template>

<style lang="scss">
@import '@uikit/views/view.scss';
</style>