<script setup lang="ts" generic="T">
import { ref } from 'vue';

import type { ButtonEmits, ButtonProps } from '@uikit/components/v-button/v-button.types';


const props = defineProps<ButtonProps<T>>();
const emit = defineEmits<ButtonEmits<T>>();

const buttonClick = (option: T) => emit('update:option', props.action(option));

const buttonStyle = ref({ 
  color: ! props?.color && ! props?.overrideBtnClass ? 'var(--v-text-primary-invert)' : props.color, 
  'background-color': ! props?.bgColor && ! props?.overrideBtnClass ? 'var(--v-button)' : props.bgColor, 
  'font-size': props?.fontSize, 
  'box-shadow': props?.boxShadow 
});
</script> 

<template>

  <div 
    :class="overrideBtnClass ? overrideBtnClass : 'v-button'"
    :style="buttonStyle"
    @click="buttonClick(props.option)">
    <font-awesome-icon v-if="icon" :icon="icon"/>
    {{ message }}
  </div>
  
</template>

<style lang="scss">
@import '@uikit/components/v-button/v-button.scss';
</style>