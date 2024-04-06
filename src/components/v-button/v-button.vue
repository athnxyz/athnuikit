<script setup lang="ts" generic="T">
import type { ButtonEmits, ButtonProps } from '@uikit/components/v-button/v-button.types';


const props = defineProps<ButtonProps<T>>();
const emit = defineEmits<ButtonEmits<T>>();

const buttonClick = (option: T) => emit('update:option', props.action(option));
</script> 

<template>

  <div 
    :class="overrideBtnClass ? overrideBtnClass : 'v-button'"
    :style="{ color, 'background-color': bgColor, 'font-size': fontSize, 'box-shadow': boxShadow }"
    @click="buttonClick(props.option)">
    <font-awesome-icon v-if="icon" :icon="icon"/>
    {{ message }}
  </div>
  
</template>

<style lang="scss">
@import '@uikit/components/v-button/v-button.scss';
</style>