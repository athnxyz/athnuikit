<script setup lang="ts">
import type { TitleProps } from '@uikit/components/v-title/v-title.types';


defineProps<TitleProps>();
</script>

<template>

  <div class="v-title">

    <p class="v-title-main">{{ title.toUpperCase() }}</p>
    <p v-if="subTitle" class="v-title-secondary">{{ subTitle.toUpperCase() }}</p>
    
  </div>
  
</template>

<style lang="scss">
@import '@uikit/components/v-title/v-title.scss';
</style>