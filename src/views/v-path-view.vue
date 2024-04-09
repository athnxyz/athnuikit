<script setup lang="ts">
import { ref } from 'vue';


type ShowcasePathNodeDataType = { id: string, refId?: string, data: string, linkMap?: { [id: string]: string }};

const pathDetailListItems = ref([
  { key: 'rootData: T', content: 'the id of the root element to load' },
  { key: 'extractIdFn: (data: T) => string', content: 'function for extract identifier from data for path node' },
  { key: 'extractPrevIdFn: (data: T) => string | null', content: 'function fo extract the reference to the previous node' },
  { key: 'extractLinkedNodes: (data: T) => string[] | null', content: 'function for extract links to potential selectable nodes' },
  { key: 'selectDataFn: (id: string) => Promise<T>', content: 'function for loading selected node in path' },
]);


const data = ref<ShowcasePathNodeDataType[]>([
  { id: '0', data: 'data for node id 0', linkMap: { '1': '1', '2': '2', '3': '3' } },
  { id: '1', refId: '0', data: 'data for node id 1', linkMap: { '4': '4', '5': '5' } },
  { id: '2', refId: '0', data: 'data for node id 2', linkMap: { '6': '6', '7': '7', '8': '8' } },
  { id: '3', refId: '0', data: 'data for node id 3', linkMap: { '9': '9' } },
  { id: '4', refId: '1', data: 'data for node id 4' },
  { id: '5', refId: '1', data: 'data for node id 5', linkMap: { '10': '10', '11': '11' } },
  { id: '6', refId: '2', data: 'data for node id 6' },
  { id: '7', refId: '2', data: 'data for node id 7' },
  { id: '8', refId: '2', data: 'data for node id 8' },
  { id: '9', refId: '3', data: 'data for node id 9' },
  { id: '10', refId: '5', data: 'data for node id 10' },
  { id: '11', refId: '5', data: 'data for node id 11' }
]);

const extractIdFn = (data: ShowcasePathNodeDataType) => data.id;
const extractPrevIdFn = (data: ShowcasePathNodeDataType) => data?.refId ?? null;
const extractLinkedNodes = (data: ShowcasePathNodeDataType) => data?.linkMap ? Object.keys(data.linkMap) : null;
const selectDataFn = async (id: string): Promise<ShowcasePathNodeDataType | undefined> => data.value.find(el => el.id === id);

const implementation = `
<v-path
  :rootData="data[0]"
  :extractIdFn="extractIdFn"
  :extractPrevIdFn="extractPrevIdFn"
  :extractLinkedNodes="extractLinkedNodes"
  :selectDataFn="selectDataFn">
  <template #nodeDataView="{ data }">
    <v-text>{{ JSON.stringify(data.data) }}</v-text>
  </template>
</v-path>
`;
</script>

<template>
  
  <v-container orientation="vertical" overflow="auto">

    <v-container orientation="vertical" border>
      <v-title title="v"></v-title>
      <v-list :items="pathDetailListItems"></v-list>
    </v-container>
    
    <v-container orientation="vertical">
      <v-title title="example"></v-title>
      <v-path
        :rootData="data[0]"
        :extractIdFn="extractIdFn"
        :extractPrevIdFn="extractPrevIdFn"
        :extractLinkedNodes="extractLinkedNodes"
        :selectDataFn="selectDataFn">
        <template #nodeDataView="{ data }">
          <v-text>{{ JSON.stringify(data.data) }}</v-text>
        </template>
      </v-path>
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