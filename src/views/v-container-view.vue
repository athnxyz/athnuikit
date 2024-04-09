<script setup lang="ts">
import { ref } from 'vue';


const containerDetailListItems = ref([
  { key: 'orientation: vertical | horizontal', content: 'the flex direction of the container' },
  { key: 'border?: boolean', content: 'show container border' },
  { key: 'overflow?: hidden | auto | visible', content: 'how the container should handle overflow' },
  { key: 'style?: { [style: string]: string }', content: 'override container style' }
]);

const implementation = ref(`
<v-container 
  orientation="vertical" 
  overflow="auto"
  border>
  <slot></slot>
</v-container>
`);
</script>

<template>

  <v-container orientation="vertical">

    <v-container orientation="vertical" border>

      <v-title title="vcontainer"></v-title>
      <v-list :items="containerDetailListItems"></v-list>
      <v-input v-model:value="implementation" disabled></v-input>
      
    </v-container>

  </v-container>

</template>

<style lang="scss">
@import '@uikit/views/view.scss';
</style>