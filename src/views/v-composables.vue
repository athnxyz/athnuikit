<script setup lang="ts">
import { ref } from 'vue';


const useScrollLoaderDetailsList = ref([
  { key: 'loadPageFn: (page: number) => Promise<T[]>', content: 'asynchronous page load function' },
  { key: 'scrollableElementRef: Ref<HTMLElement | null>', content: 'the scrollable html element to load content in' }
]);

const useScrollLoaderImpl = `
const scrollElRef = ref(null);
const loadDataFn = async (page: number) => { /* paginate function */ };

// items exposes a ref for the current page data
// loading exposes a ref for loading state
// error exposes a ref for Error objects on data load failure
const { items, loading, error } = useScrollLoader(loadDataFn, scrollElRef);
`;

const useLocalStorageImpl = `

`;
</script>

<template>
  
  <v-container orientation="vertical">

    <v-container orientation="vertical" border>
      <v-title title="usescrollloader"></v-title>
      <v-list :items="useScrollLoaderDetailsList"></v-list>
      <v-input v-model:value="useScrollLoaderImpl" disabled></v-input>
    </v-container>
    
    <v-container orientation="vertical" border>
      <v-title title="uselocalstorage"></v-title>
      <v-list></v-list>
      <v-input v-model:value="useLocalStorageImpl" disabled></v-input>
    </v-container>

  </v-container>

</template>

<style lang="scss">
@import '@uikit/views/view.scss';
</style>