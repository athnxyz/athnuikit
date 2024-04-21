<script setup lang="ts" generic="T extends string">
import { ref, watch, onMounted } from 'vue';
import { every } from 'lodash';

import type { SearchEmits, SearchProps } from '@uikit/components/v-search/v-search.types';
import { defaultSearchProps } from '@uikit/components/v-search/v-search.types';


const props = withDefaults(defineProps<SearchProps<T>>(), defaultSearchProps);
const emit = defineEmits<SearchEmits>();

const textRef = ref<string>(props.text);
const focusRef = ref<boolean>(false);
const searchInputRef = ref<HTMLElement | undefined>();

const handleKeydown = async (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    return await props.onSubmit(textRef.value);
  }
  
  if (event.key === 'Tab') {
    return true;
  }
};

const handleClickOutsideSearch = (event: MouseEvent) => {
  const condition = every([
    searchInputRef.value && ! searchInputRef.value.contains(event.target as Node),
  ]);

  if (condition) focusRef.value = false;
};

watch(textRef, text => {
  console.log('updated input:', text);
  emit('update:text', text);
});

onMounted(() => {
  document.addEventListener('click', handleClickOutsideSearch, true)
});
</script>

<template>
  <div class="v-search">
    <input 
      ref="searchInputRef"
      v-model="textRef"
      :placeholder="placeholder"
      @focus="focusRef = true"
      @keydown="handleKeydown">
  </div>
</template>

<style lang="scss">
@import '@uikit/components/v-search/v-search.scss';
</style>