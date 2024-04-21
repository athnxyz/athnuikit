<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { every } from 'lodash';

import type { SearchProps, SearchContextMap } from '@uikit/components/v-search/v-search.types';
import { defaultSearchProps } from '@uikit/components/v-search/v-search.types';
import type { ContextMap } from '@uikit/composables/useHints';
import { useHints } from '@uikit/composables/useHints';


const props = withDefaults(defineProps<SearchProps>(), defaultSearchProps);
const { findClosestContextStart, updateCursorPosition, parseContext } = useHints();

const textRef = ref<string>(props.text);
const searchInputRef = ref<HTMLElement | undefined>();
const searchHintsRef = ref<HTMLElement | undefined>();
const cursorRef = ref<number>(0);
const contextPositions = ref<ContextMap[]>([]);
const searchHelpSelection = ref<string>();
const focusRef = ref<boolean>(false);

const parseCurrentContexts = (updatedValue: string): Pick<SearchContextMap, 'context' | 'filters'>[] => {
  const contextRegex = /(\[([^\]]+)\])/g;
  contextPositions.value = [];

  let match: RegExpExecArray | null;
  while ((match = contextRegex.exec(updatedValue))) {
    if (match[1]) {
      contextPositions.value.push({ context: match[1], start: match.index, end: match.index + match[1].length ?? 0 }); 
    }
  }

  return contextPositions.value.length > 0 ? contextPositions.value.map((context: ContextMap, idx: number) => {
    const endOfContext = idx < contextPositions.value.length - 1 ? contextPositions.value[idx + 1].start : updatedValue.trim().length;
    const filters = ((start: number, stop: number) => {
      return updatedValue
        .slice(start, stop)
        .split(',')
        .map(el => el.trim())
        .filter(el => el);
    })(context.end, endOfContext);

    return { context: context.context, filters };
  }) : [];
};

const getLocalContext = (): ContextMap | null => {
  if (cursorRef.value < 1 || contextPositions.value.length < 1) return null;

  const contextFilter = findClosestContextStart(contextPositions.value, cursorRef.value);
  if (props.contextMap && contextFilter) {
    const validContext = props.contextMap[parseContext(contextFilter.context)];
    if (validContext) return contextFilter;
    return null;
  }

  return contextFilter ??  null;
};

const handleInput = (payload: Event) => {
  const updatedValue = (payload.target as HTMLInputElement).value;
  cursorRef.value = updateCursorPosition(textRef.value, updatedValue);

  if (! updatedValue || updatedValue.trim() === '') {
    // need to reset selected filters
    return;
  }

  const parsedContexts = parseCurrentContexts(updatedValue);
  const localContext = getLocalContext();
  if (localContext && localContext.context !== searchHelpSelection.value) searchHelpSelection.value = localContext.context;
}

const handleKeydown = async (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    focusRef.value = false;
    return await props.onSubmit(textRef.value);
  }
  
  if (event.key === 'Tab') {
    return true;
  }
};

const handleClickOutsideSearch = (event: MouseEvent) => {
  const condition = every([
    searchInputRef.value && ! searchInputRef.value.contains(event.target as Node),
    searchHintsRef.value && ! searchHintsRef.value.contains(event.target as Node)
  ]);

  if (condition) focusRef.value = false;
};

onMounted(() => document.addEventListener('click', handleClickOutsideSearch, true));
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutsideSearch, true));
</script>

<template>

  <div class="v-search-container">

    <div class="v-search-input">
      <input ref="searchInputRef"
        :value="textRef"
        :placeholder="placeholder"
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="focusRef = true">
    </div>

    <v-fade type="single">
      <div v-if="focusRef" ref="searchHintsRef"
        class="v-search-hints">
        <v-container orientation="vertical" border>
          <p>hi</p>
        </v-container>
      </div>
    </v-fade>
    
  </div>
</template>

<style lang="scss">
@import '@uikit/components/v-search/v-search.scss';
</style>