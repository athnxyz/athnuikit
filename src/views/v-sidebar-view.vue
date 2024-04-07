<script setup lang="ts">
const sidebarDetailListItems = [
  { key: 'button: SidebarButtonProps', content: 'styling and content for the dropdown toggle' },
  { key: 'position: left | right', content: 'the sidebar position' },
];

const viewContainerStyle = {
  width: '100%'
}

const innerContainerStyle = {
  width: '100%',
  height: 'fit-content',
};

const implementation = `
<v-sidebar 
  position="right"
  :button="{ message: 'show sidebar', bgColor: 'var(--color-button)' }">
  <template #sidebar>
    <v-text>sidebar content!</v-text>
  </template>
</v-sidebar>`;
</script>

<template>

  <v-container 
    orientation="vertical" 
    :border="false"
    :style="viewContainerStyle">

    <v-container
      orientation="vertical" 
      :border="true"
      :style="innerContainerStyle">
      <v-title title="vsidebar"></v-title>
      <v-list :items="sidebarDetailListItems"></v-list>
    </v-container>
    
    <v-container
      orientation="vertical" 
      :border="true"
      :style="innerContainerStyle">

      <v-title title="example"></v-title>

      <v-sidebar 
        position="right"
        :button="{ message: 'show sidebar', bgColor: 'var(--color-button)' }">
        <template #sidebar>
          <v-text>sidebar content!</v-text>
        </template>
      </v-sidebar>

    </v-container>

    <v-container 
      orientation="vertical" 
      :border="true"
      :style="innerContainerStyle">
      <v-title title="implementation"></v-title>
      <v-input v-model:value="implementation" :disabled="true"></v-input>
    </v-container>

  </v-container>

</template>

<style lang="scss">
@import '@uikit/views/view.scss';
</style>