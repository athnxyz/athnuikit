<script setup lang="ts">
import { ref } from 'vue';

import type { TitleProps } from '@uikit/components/v-title/v-title.types';


const props = defineProps<TitleProps>();
const styles = ref({ ...(props?.border ? { 'border-left': '0.25rem solid var(--v-title-border)' } : {})})
</script>

<template>

  <div class="v-title" :style="styles">

    <p class="v-title-main">{{ title.toUpperCase() }}</p>
    <p v-if="subTitle" class="v-title-secondary">{{ subTitle.toUpperCase() }}</p>
    
  </div>
  
</template>

<style lang="scss">
@import '@uikit/components/v-title/v-title.scss';
</style>