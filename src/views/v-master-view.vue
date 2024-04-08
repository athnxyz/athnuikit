<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';


type ShowcaseKeyType = { id: number, content: string };

const masterViewDetailListItems = ref([
  { key: 'selectedKey: T', content: 'the currently selected key element' },
  { key: 'loadKeysFn(page: number): Promise<T[]>', content: 'lazy load keys on scroll' },
  { key: 'extractKeyFn(keyObj: T): string', content: 'extract the unique id from a key' },
  { key: 'getDataFn(key: string): Promise<V>', content: 'get the data associated with a key' },
  { key: 'keyViewStyle?: { [style: string]: string }', content: 'optional styling for the key view' },
]);

const selectedKey: Ref<string | null> = ref(null);
const keys: Ref<{ page: number, items: ShowcaseKeyType[] }[]> = ref([
  { 
    page: 0, 
    items: [
      { id: 0, content: 'this is key 0' },
      { id: 1, content: 'this is key 1' },
      { id: 2, content: 'this is key 2' },
      { id: 3, content: 'this is key 3' },
      { id: 4, content: 'this is key 4' },
      { id: 5, content: 'this is key 5' },
      { id: 6, content: 'this is key 6' },
      { id: 7, content: 'this is key 7' },
      { id: 8, content: 'this is key 8' },
      { id: 9, content: 'this is key 9' },
    ]
  },
  { 
    page: 1, 
    items: [
      { id: 10, content: 'this is key 10' },
      { id: 11, content: 'this is key 11' },
      { id: 12, content: 'this is key 12' },
      { id: 13, content: 'this is key 13' },
      { id: 14, content: 'this is key 14' },
      { id: 15, content: 'this is key 15' },
      { id: 16, content: 'this is key 16' },
      { id: 17, content: 'this is key 17' },
      { id: 18, content: 'this is key 18' },
      { id: 19, content: 'this is key 19' },
    ]
  },
]);

const data =  ref([
  'data for master view 0',
  'data for master view 1',
  'data for master view 2',
  'data for master view 3',
  'data for master view 4',
  'data for master view 5',
  'data for master view 6',
  'data for master view 7',
  'data for master view 8',
  'data for master view 9',
  'data for master view 10',
  'data for master view 11',
  'data for master view 12',
  'data for master view 13',
  'data for master view 14',
  'data for master view 15',
  'data for master view 16',
  'data for master view 17',
  'data for master view 18',
  'data for master view 19',
]);

const loadKeysFn = async (page: number): Promise<{ id: number, content: string }[]> => {
  return keys.value.find(p => p.page === page)?.items ?? [];
}
const extractKeyFn = (key: { id: number, content: string }) => key.id.toString();
const getDataFn = (key: string) => data.value[parseInt(key)];

const implementation = `
<v-master-view
  v-model:selectedKey="selectedKey"
  :loadKeysFn="loadKeysFn"
  :extractKeyFn="extractKeyFn"
  :getDataFn="getDataFn">
  <template #keyview="{ key }">
    <v-text>{{ key.content }}</v-text>
  </template>
  <template #dataview="{ data }">
    <v-text>{{ data }}</v-text>
  </template>
</v-master-view>`;
</script>

<template>
  
  <v-container orientation="vertical" overflow="auto">

    <v-container orientation="vertical" border>
      <v-title title="vmasterview"></v-title>
      <v-list :items="masterViewDetailListItems"></v-list>
    </v-container>
    
    <v-container orientation="vertical" overflow="hidden">
      <v-title title="example"></v-title>
      <v-master-view
        v-model:selectedKey="selectedKey"
        :loadKeysFn="loadKeysFn"
        :extractKeyFn="extractKeyFn"
        :getDataFn="getDataFn">
        <template #keyview="{ key }">
          <v-text>{{ key.content }}</v-text>
        </template>
        <template #dataview="{ data }">
          <v-text>{{ data }}</v-text>
        </template>
      </v-master-view>
    </v-container>

    <v-container orientation="vertical" border>
      <v-title title="implementation"></v-title>
      <v-input v-model:value="implementation" disabled></v-input>
    </v-container>

  </v-container>

</template>

<style lang="scss">
@import '@uikit/views/view.scss';
</style>