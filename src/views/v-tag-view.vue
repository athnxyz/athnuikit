<script setup lang="ts">
import { ref } from 'vue';


const tagDetailListItems = ref([
  { key: 'content: { text?: string, icon?: string }', content: 'the display text and icon for the tag' },
  { key: 'color: string', content: 'the display text color for the tag' },
  { key: 'bgColor: string', content: 'the background color for the tag' },
]);

const implementation = ref(`
<v-tag 
  :content="{ text: 'test' }"
  color="var(--v-text-primary)"
  bgColor="var(--v-soft-green)">
</v-tag>
`);
</script>

<template>
  <v-container orientation="vertical">
    
    <v-container orientation="vertical" border>
      <v-title title="vtag"></v-title>
      <v-list 
        :items="tagDetailListItems"
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

      <v-tag 
        :content="{ text: 'example' }"
        color="var(--v-text-primary)"
        bgColor="var(--v-soft-green)">
      </v-tag>

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