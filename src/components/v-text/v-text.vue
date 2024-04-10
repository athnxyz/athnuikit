<script setup lang="ts">
import type { TextProps } from '@uikit/components/v-text/v-text.types';


defineProps<TextProps>();
</script>

<template>

  <div class="v-text-container" v-cloak>
    <slot></slot>
  </div>
  
</template>

<style lang="scss">
@import '@uikit/components/v-text/v-text.scss';
</style>