<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';


const dropdownDetailListItems = ref([
  { key: 'button: DropdownButtonProps', content: 'styling and content for the dropdown toggle' },
  { key: 'options: DropdownOption[]', content: 'a list of label, action, and icon for each selectable element' }
]);

const selected: Ref<string | null> = ref(null);
const options = ref([
  { label: 'option1', action: () => 'option1' },
  { label: 'option2', action: () => 'option2' }
]);

const implementation = ref(`
<v-dropdown 
  :button="{ message: 'open dropdown' }"
  :options="options">
</v-dropdown>
`);
</script>

<template>
  
  <v-container orientation="vertical">

    <v-container orientation="vertical" border>
      <v-title title="vdropdown"></v-title>
      <v-list :items="dropdownDetailListItems"></v-list>
    </v-container>
    
    <v-container orientation="vertical">

      <v-dropdown
        v-model:selection="selected"
        :button="{ message: 'open dropdown' }"
        :options="options">
      </v-dropdown>
      
      <v-text>selected {{ selected ?? 'N/A' }}</v-text>

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