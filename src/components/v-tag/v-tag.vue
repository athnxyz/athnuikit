<script setup lang="ts">
import type { TagProps } from '@uikit/components/v-tag/v-tag.types';


defineProps<TagProps>();
</script>

<template>

  <div class="v-tag">
    <div class="v-tag-content">{{ content }}</div>
  </div>

</template>

<style lang="scss">
@import '@uikit/components/v-tag/v-tag.scss';
</style>