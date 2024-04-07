<script setup lang="ts">
import { ref } from 'vue';


const buttonDetailListItems = [
  { key: 'v-model:option: T', content: 'the selectable action on the button' },
  { key: 'action: (option: T) => T', content: 'the update function on button click' },
  { key: 'icon?: string', content: 'button icon' },
  { key: 'message?: string', content: 'button message' },
  { key: 'color?: string', content: 'button text color' },
  { key: 'bgColor?: string', content: 'button background color' },
  { key: 'boxShadow?: string', content: 'button box shadow' },
  { key: 'fontSize?: string', content: 'button text font size' },
  { key: 'overrideBtnClass?: string', content: 'override button style' }
];

const viewContainerStyle = {
  width: '100%'
}

const innerContainerStyle = {
  width: '100%',
  height: 'fit-content',
};

const showText = ref(false);
const handleClick = (option: boolean) => ! option;

const implementation = `
<v-button 
  v-model:option="showText"
  :action="handleClick"
  message="reveal message"
  bgColor="var(--color-button)">
</v-button>`;
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
      <v-title title="vbutton"></v-title>
      <v-list :items="buttonDetailListItems"></v-list>
    </v-container>
    
    <v-container
      orientation="vertical" 
      :border="true"
      :style="innerContainerStyle">

      <v-title title="example"></v-title>
      
      <v-container 
        orientation="horizontal" 
        :border="false"
        :style="innerContainerStyle">
        <v-button 
          v-model:option="showText"
          :action="handleClick"
          message="reveal message"
          bgColor="var(--color-button)">
        </v-button>

        <v-text v-if="showText">message revealed!</v-text>
      </v-container>

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