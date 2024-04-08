<script setup lang="ts">
import { ref } from 'vue';


const contaienrDetailListItems = ref([
  { key: 'orientation: vertical | horizontal', content: 'the flex direction of the container' },
  { key: 'border?: boolean', content: 'show container border' },
  { key: 'hidden?: boolean', content: 'whether or not the container data should overflow or not' },
  { key: 'style?: { [style: string]: string }', content: 'override container style' }
]);

const implementation = `
<v-container orientation="vertical" border hidden>
  <slot></slot>
</v-container>`;
</script>

<template>

  <v-container orientation="vertical">

    <v-container orientation="vertical" border>
      <v-title title="vcontainer"></v-title>
      <v-list :items="contaienrDetailListItems"></v-list>
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