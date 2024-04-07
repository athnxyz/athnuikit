<script setup lang="ts">
import type { ContainerProps } from '@uikit/components/v-container/v-container.types';

const props = defineProps<ContainerProps>();

const defaultStyle = { 
  border: props.border ? '2px solid var(--color-border)' : 'none', 
  'border-radius': '0.25rem' 
};
</script>

<template>

  <div 
    :class="orientation === 'vertical' ? 'v-container-vertical' : 'v-container-horizontal'"
    :style="style ? { ...style, ...defaultStyle } : defaultStyle">
    <slot></slot>
  </div>

</template>

<style lang="scss">
@import '@uikit/components/v-container/v-container.scss';
</style>