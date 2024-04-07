<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';

import { viewContainerStyle, innerContainerStyle } from '@uikit/views/viewstyles';


const dropdownDetailListItems = ref([
  { key: 'button: DropdownButtonProps', content: 'styling and content for the dropdown toggle' },
  { key: 'options: DropdownOption[]', content: 'a list of label, action, and icon for each selectable element' }
]);

const selected: Ref<string | null> = ref(null);
const options = ref([
  { label: 'option1', action: () => selected.value = 'option1' },
  { label: 'option2', action: () => selected.value = 'option2' }
]);

const implementation = `
<v-dropdown 
  :button="{ message: 'open dropdown' }"
  :options="options">
</v-dropdown>`;
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
      <v-title title="vdropdown"></v-title>
      <v-list :items="dropdownDetailListItems"></v-list>
    </v-container>
    
    <v-container
      orientation="vertical" 
      :border="false"
      :style="innerContainerStyle">

      <v-title title="example"></v-title>
      
      <v-dropdown 
        :button="{ message: 'open dropdown' }"
        :options="options">
      </v-dropdown>

      <v-text v-if="selected">selected {{ selected }}</v-text>

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