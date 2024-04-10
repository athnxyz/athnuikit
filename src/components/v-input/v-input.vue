<script setup lang="ts">
import { ref, watch } from 'vue';

import type { InputEmits, InputProps } from '@uikit/components/v-input/v-input.types';
import { defaultInputProps } from '@uikit/components/v-input/v-input.types';


const props = withDefaults(defineProps<InputProps>(), defaultInputProps);
const emit = defineEmits<InputEmits>();

const valueRef = ref(props.value);
watch(valueRef, (update: string) => emit('update:value', update));
</script>

<template>

  <div v-cloak class="v-input">
    <textarea v-focus v-model="valueRef" disabled></textarea>
  </div>

</template>

<style lang="scss">
@import '@uikit/components/v-input/v-input.scss';
</style>