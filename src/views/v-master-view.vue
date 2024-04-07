<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';

import { viewContainerStyle, innerContainerStyle } from '@uikit/views/viewstyles';


const masterViewDetailListItems = ref([
  { key: 'keys: T[]', content: 'the key objects for the key view' },
  { key: 'selectedKey: T', content: 'the currently selected key element' },
  { key: 'extractKeyFn(keyObj: T): string', content: 'extract the unique id from a key' },
  { key: 'getDataFn(key: string): Promise<V>', content: 'get the data associated with a key' },
  { key: 'keyViewStyle?: { [style: string]: string }', content: 'optional styling for the key view' },
]);

const selected: Ref<string | null> = ref(null);
const options = ref([
  { label: 'option1', action: () => selected.value = 'option1' },
  { label: 'option2', action: () => selected.value = 'option2' }
]);

const keys = ref([
  { id: 0, content: 'this is the first key '},
  { id: 1, content: 'this is the second key '},
]);

const data =  ref([
  'data for master view 1',
  'data for master view 2',
]);

const extractKeyFn = (key: { id: number, content: string }) => key.id.toString();
const getDataFn = (key: string) => data.value[parseInt(key)];

const implementation = `
<v-master-view
  :keys="keys"
  v-model:selectedKey="selected"
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
  
  <v-container 
    orientation="vertical" 
    :border="false"
    :style="viewContainerStyle">

    <v-container
      orientation="vertical" 
      :border="false"
      :style="innerContainerStyle">
      <v-title title="vmasterview"></v-title>
      <v-list :items="masterViewDetailListItems"></v-list>
    </v-container>
    
    <v-container
      orientation="vertical" 
      :border="false"
      :style="innerContainerStyle">

      <v-title title="example"></v-title>
      
      <v-master-view
        :keys="keys"
        :selectedKey="selected"
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

    <v-container 
      orientation="vertical" 
      :border="false"
      :style="innerContainerStyle">
      <v-title title="implementation"></v-title>
      <v-input v-model:value="implementation" :disabled="true"></v-input>
    </v-container>

  </v-container>

</template>

<style lang="scss">
@import '@uikit/views/view.scss';
</style>