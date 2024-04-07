<script setup lang="ts">
import { ref } from 'vue';

import type { AnimationProps } from '@uikit/animations/animations.types';


const props = defineProps<AnimationProps>();
const isGroup = ref(props.type === 'group');
</script>

<template>

  <TransitionGroup v-if="isGroup" name="v-slide-vertical" :tag="tag" appear>
    <slot></slot>
  </TransitionGroup>

  <Transition v-else name="v-slide-vertical">
    <slot></slot>
  </Transition>

</template>

<style lang="scss">
.v-slide-vertical-enter-active {
  transition: all 0.3s ease;
}

.v-slide-vertical-leave-active {
  transition: all 0.3s ease;
}

.v-slide-vertical-enter-from,
.v-slide-vertical-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>