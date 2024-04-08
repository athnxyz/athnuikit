<script setup lang="ts">
import { ref } from 'vue';


const sidebarDetailListItems = ref([
  { key: 'button: SidebarButtonProps', content: 'styling and content for the dropdown toggle' },
  { key: 'position: left | right', content: 'the sidebar position' },
]);

const implementation = `
<v-sidebar 
  position="right"
  :button="{ message: 'show sidebar' }">
  <template #sidebar>
    <v-text>sidebar content!</v-text>
  </template>
</v-sidebar>`;
</script>

<template>

  <v-container orientation="vertical">

    <v-container orientation="vertical" border>
      <v-title title="vsidebar"></v-title>
      <v-list :items="sidebarDetailListItems"></v-list>
    </v-container>
    
    <v-container orientation="vertical">

      <v-title title="example"></v-title>

      <v-sidebar :button="{ message: 'show sidebar' }">
        <template #sidebar>
          <v-text>sidebar content!</v-text>
        </template>
      </v-sidebar>

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