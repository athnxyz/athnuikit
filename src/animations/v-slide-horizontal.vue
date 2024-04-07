<script setup lang="ts">
import { ref } from 'vue';

import type { AnimationProps } from '@uikit/animations/animations.types';


const props = defineProps<AnimationProps>();
const isGroup = ref(props.type === 'group');
</script>

<template>

  <TransitionGroup v-if="isGroup" name="v-slide-horizontal" :tag="tag" appear>
    <slot></slot>
  </TransitionGroup>

  <Transition v-else name="v-slide-horizontal">
    <slot></slot>
  </Transition>

</template>

<style lang="scss">
.v-slide-horizontal-enter-active {
  transition: all 0.3s ease;
}

.v-slide-horizontal-leave-active {
  transition: all 0.3s ease;
}

.v-slide-horizontal-enter-from,
.v-slide-horizontal-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>