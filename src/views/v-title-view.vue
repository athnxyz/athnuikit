<script setup lang="ts">
import { ref } from 'vue';


const titleDetailListItems = ref([
  { key: 'title: string', content: 'the title text' },
  { key: 'subTitle?: string', content: 'optional sub title text' },
  { key: 'border?: boolean', content: 'an optional border for the title' },
]);

const implementation = ref(`<v-title title="this is a title" subTitle="this is a sub title"></v-title>`);
</script>

<template>
  <v-container orientation="vertical" :border="false">
    
    <v-container orientation="vertical" border>
      <v-title title="vtitle" border></v-title>
      <v-list 
        :items="titleDetailListItems"
        :extractKeyFn="(key: string) => key">

        <template #key="{ key }">
          {{ key }}
        </template>

        <template #content="{ content }">
          {{  content  }}
        </template>
        
      </v-list>
    </v-container>
    
    <v-container orientation="vertical">

      <v-title title="this is a title" subTitle="this is a sub title"></v-title>

      <v-title 
        title="this title has a border" 
        subTitle="this sub title has a border" 
        border>
      </v-title>

    </v-container>

    <v-container orientation="vertical" border>
      <v-title title="implementation" border></v-title>
      <v-input v-model:value="implementation" disabled></v-input>
    </v-container>

  </v-container>
</template>

<style lang="scss">
@import '@uikit/views/view.scss';
</style>