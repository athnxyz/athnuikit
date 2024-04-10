<script setup lang="ts">
import type { TagProps } from '@uikit/components/v-tag/v-tag.types';


defineProps<TagProps>();
</script>

<template>

  <div class="v-tag" v-cloak
    :style="{ color, 'background-color': bgColor }">
    <div class="v-tag-content">{{ content.text }}</div>
  </div>

</template>

<style lang="scss">
@import '@uikit/components/v-tag/v-tag.scss';
</style>