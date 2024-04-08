<script setup lang="ts" generic="T">
import { ref } from 'vue';

import type { ButtonEmits, ButtonProps } from '@uikit/components/v-button/v-button.types';
import { defaultButtonProps } from '@uikit/components/v-button/v-button.types';
import { useDebounce } from '@uikit/composables/useDebounce';


const props = withDefaults(defineProps<ButtonProps<T>>(), defaultButtonProps);
const emit = defineEmits<ButtonEmits<T>>();

const { debounce } = useDebounce<(option: T) => void>();

const buttonStyle = ref({ 
  color: ! props?.overrideBtnClass ? props.color : undefined, 
  'background-color': ! props?.overrideBtnClass ? props.bgColor : undefined, 
  'font-size': props?.fontSize, 
  'box-shadow': props?.boxShadow 
});

const buttonClick = (option: T) => emit('update:option', props.action(option));
const debounceButtonClick = debounce(buttonClick, props.debounce);
</script> 

<template>

  <div :class="overrideBtnClass ? overrideBtnClass : 'v-button'"
    :style="buttonStyle"
    @click="debounceButtonClick(props.option)">
    <font-awesome-icon v-if="icon" :icon="icon"/>
    {{ message }}
  </div>
  
</template>

<style lang="scss">
@import '@uikit/components/v-button/v-button.scss';
</style>