<script setup lang="ts">
import { ref } from 'vue';


const buttonShowcaseContainerStyle = ref({
  'align-items': 'center'
});

const messages: ('click me!' | 'clicked!')[] = [ 'click me!', 'clicked!' ]
const message = ref(messages[0]);
const handleClick = (option: string) => messages.filter(m => m !== option)[0];

const buttonDetailListItems = ref([
  { key: 'v-model:option: T', content: 'the selectable action on the button' },
  { key: 'action: (option: T) => T', content: 'the update function on button click' },
  { key: 'debounce?: number', content: 'a debounce period for the button click' },
  { key: 'icon?: string', content: 'button icon' },
  { key: 'message?: string', content: 'button message' },
  { key: 'color?: string', content: 'button text color' },
  { key: 'bgColor?: string', content: 'button background color' },
  { key: 'boxShadow?: string', content: 'button box shadow' },
  { key: 'fontSize?: string', content: 'button text font size' },
  { key: 'overrideBtnClass?: string', content: 'override button style' }
]);

const implementation = ref(`
<v-button 
  v-model:option="message"
  :action="handleClick"
  :message="message">
</v-button>
`);
</script>

<template>

  <v-container orientation="vertical">

    <v-container orientation="vertical" border>
      <v-title title="vbutton" border></v-title>
      <v-list 
        :items="buttonDetailListItems"
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
      :style="buttonShowcaseContainerStyle">

      <v-button 
        v-model:option="message"
        :action="handleClick"
        :message="message">
      </v-button>
      
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