<script setup lang="ts">
import { ref } from 'vue';


const sidebarShowcaseContainerStyle = ref({
  'align-items': 'center'
});

const sidebarDetailListItems = ref([
  { key: 'button: SidebarButtonProps', content: 'styling and content for the dropdown toggle' },
  { key: 'position: left | right', content: 'the sidebar position' },
]);

const implementation = ref(`
<v-sidebar :button="{ message: 'show sidebar' }">
        
  <template #sidebar>
    <v-text>sidebar content!</v-text>
  </template>

</v-sidebar>
`);
</script>

<template>

  <v-container orientation="vertical">

    <v-container orientation="vertical" border>
      <v-title title="vsidebar" border></v-title>
      <v-list 
        :items="sidebarDetailListItems"
        :extractKeyFn="(key: string) => key">

        <template #key="{ key }">
          {{ key }}
        </template>

        <template #content="{ content }">
          {{  content  }}
        </template>
        
      </v-list>
    </v-container>
    
    <v-container 
      orientation="vertical"
      :style="sidebarShowcaseContainerStyle">
      
      <v-sidebar :button="{ message: 'show sidebar' }">

        <template #sidebar>
          <v-text>sidebar content!</v-text>
        </template>

      </v-sidebar>

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