<script setup lang="ts">
import { ref } from 'vue';


const listDetailListItems = ref([
  { key: 'items: { key: T, content: V }[]', content: 'a list of the key and associated content for the key' },
  { key: 'extractKeyFn: (key: T) => string', content: 'get a unique identifier from the key' },
  { key: 'icon?: string', content: 'list item icon' }
]);

const implementation = ref(`
<v-list 
  :items="testListItems"
  :extractKeyFn="(key: string) => key">

  <template #key="{ key }">
    {{ key }}
  </template>

  <template #content="{ content }">
    {{  content  }}
  </template>
  
</v-list>
`);
</script>

<template>

  <v-container orientation="vertical">

    <v-container orientation="vertical" border>
      <v-title title="vlist" border></v-title>
      <v-list 
        :items="listDetailListItems"
        :extractKeyFn="(key: string) => key">
      
        <template #key="{ key }">
          {{ key }}
        </template>

        <template #content="{ content }">
          {{  content  }}
        </template>
        
      </v-list>
      <v-input v-model:value="implementation" disabled></v-input>
    </v-container>

  </v-container>

</template>

<style lang="scss">
@import '@uikit/views/view.scss';
</style>