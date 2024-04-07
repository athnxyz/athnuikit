<script setup lang="ts">
import { ref } from 'vue';

import type { AnimationProps } from '@uikit/animations/animations.types';


const props = defineProps<AnimationProps>();
const isGroup = ref(props.type === 'group');
</script>

<template>

  <TransitionGroup v-if="isGroup" name="v-fade" :tag="tag" appear>
    <slot></slot>
  </TransitionGroup>

  <Transition v-else name="v-fade">
    <slot></slot>
  </Transition>

</template>

<style lang="scss">
.v-fade-enter-active,
.v-fade-leave-active {
  transition: opacity 0.5s ease;
}

.v-fade-enter-from,
.v-fade-leave-to {
  opacity: 0;
}
</style>