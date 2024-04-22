<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { difference, escapeRegExp, every } from 'lodash';

import type { SearchEmits, SearchProps, SearchContextMap, UsedSearchContextMap } from '@uikit/components/v-search/v-search.types';
import { defaultSearchProps } from '@uikit/components/v-search/v-search.types';
import type { ContextMap } from '@uikit/composables/useHints';
import { useHints } from '@uikit/composables/useHints';


const props = withDefaults(defineProps<SearchProps>(), defaultSearchProps);
const emit = defineEmits<SearchEmits>();
const { 
  findClosestContextStart, findWordStart, updateCursorPosition, stringifyIfNeeded, parseContext
} = useHints();

// text refs
const textRef = ref<string>(props.text); // the input value in the search bar
const displayHintsRef = ref<string[]>([]); // the currently available hints for a context, if any
const usedContextMap = ref<{ [context: string]: UsedSearchContextMap }>({}); // track already used filters for available contexts

// positional refs
const cursorRef = ref<number>(0);
const contextPositions = ref<ContextMap[]>([]);
const searchHelpSelection = ref<string>();

// elem refs
const searchInputRef = ref<HTMLElement | undefined>();
const searchHintsRef = ref<HTMLElement | undefined>();
const focusRef = ref<boolean>(false);

const getLocalContext = (): ContextMap | undefined => { // get the current context (left aligned) from the current cursor position
  if (cursorRef.value < 1 || contextPositions.value.length < 1) return undefined;

  const contextFilter = findClosestContextStart(contextPositions.value, cursorRef.value);
  if (props.contextMap && contextFilter) {
    const validContext = props.contextMap[parseContext(contextFilter.context)];
    return validContext ? contextFilter: undefined // if context exists in mapping, return it, otherwise undefined
  }

  return contextFilter ??  undefined; // if hints are disabled, just return the filter since no validation needs to occur
};

const parseCurrentContexts = (updatedValue: string): Pick<SearchContextMap, 'context' | 'filters'>[] => {
  const contextRegex = /(\[([^\]]+)\])/g;
  contextPositions.value = [];

  let match: RegExpExecArray | null;
  while ((match = contextRegex.exec(updatedValue))) { // for each matched context, upate positions within the search string (start and end index for each context is tracked)
    if (match[1]) contextPositions.value.push({ context: match[1], start: match.index, end: match.index + match[1].length ?? 0 });
  }

  return contextPositions.value.length > 0 ? contextPositions.value.map((context: ContextMap, idx: number) => {
    const endOfContext = idx < contextPositions.value.length - 1 ? contextPositions.value[idx + 1].start : updatedValue.trim().length;
    const filters = ((start: number, stop: number) => { // parse the filters from the search string for each context
      return updatedValue
        .slice(start, stop) // start and stop at start and end indexes of context
        .split(',') // comma separated
        .map(el => el.trim())
        .filter(el => el);
    })(context.end, endOfContext);

    return { context: context.context, filters };
  }) : [];
};

const updateUsedContextMap = (updatedContextFilters: Pick<SearchContextMap, 'context' | 'filters'>[]) => { // update tracked filters to add/remove filters based on latest update
  updatedContextFilters.forEach(contextFilter => {
    usedContextMap.value[parseContext(contextFilter.context)].filters = new Set<string>(); // clear the current set, we will just rebuild from incoming
    for (const filter of contextFilter.filters) {
      usedContextMap.value[parseContext(contextFilter.context)].filters.add(stringifyIfNeeded(filter)); // add used filters to mapping for each context
    }
  });
}

const getHints = () => { // get hints to display based on current text value and cursor position
  if (! props.contextMap) return; // if no context map, just return empty (hints are disabled)
  const resetHints = () => displayHintsRef.value = [];

  const shouldDisableHints = (() => {
    if (cursorRef.value === 0) return true; // if cursor at 0

    const preCursorText = textRef.value.substring(0, cursorRef.value);
    const isRegexPattern = preCursorText.trim().startsWith('/');
    const hideHintsConditions = [
      /\b\w+\s+$/.test(preCursorText) && isRegexPattern, // if space after a word with no comma
      ! /,\s*$/.test(preCursorText) && isRegexPattern, // if not after a comma, space or not
      ! /\[\w+\s*$/.test(preCursorText), // if not a partial context with [context
      ! /\/\w*$/.test(preCursorText) // if not a partial word starting with '/'
    ];

    return (hideHintsConditions.every(condition => condition));
  })();

  if (shouldDisableHints) return;

  const localContext = getLocalContext();
  if (! localContext) return resetHints();

  const existingFilters = usedContextMap.value[parseContext(localContext.context)]?.filters?? [];
  const contextFilter = props.contextMap[parseContext(localContext.context)];
  const stringifiedFilters = contextFilter.filters.map(el => stringifyIfNeeded(el));
  const availableFilters = difference(stringifiedFilters, [ ...existingFilters ]); // get the available filters based on the filters in the updated map and the tracked filters

  const currWordStart = findWordStart(textRef.value.slice(0, cursorRef.value), localContext.end, cursorRef.value);
  const partialWord = ((): string => {
    const pW = textRef.value.slice(currWordStart, cursorRef.value).trim();
    console.log('pw', pW, 'curr word start:', currWordStart, 'cursor:', cursorRef.value);
    if (pW.startsWith('/')) return pW.slice(1);
    return pW;
  })();

  displayHintsRef.value = availableFilters.filter(val => val.match(new RegExp(`^${escapeRegExp(partialWord)}`, 'i'))); // filter for all full and partial word matches
}

const handleInput = (payload: Event) => { // track the input event from the input box
  const updatedValue = (payload.target as HTMLInputElement).value;
  cursorRef.value = updateCursorPosition(textRef.value, updatedValue); // update the current cursor position

  if (! updatedValue || updatedValue.trim() === '') {
    searchHelpSelection.value = undefined;
    textRef.value = '';
    return;
  }

  const parsedContexts = parseCurrentContexts(updatedValue); // parse current contexts and filters from updated value
  if (props.contextMap && parsedContexts?.length > 0) { 
    updateUsedContextMap(parsedContexts); // update already used context mapping
  }

  textRef.value = updatedValue;
  getHints(); // display hints to user

  const localContext = getLocalContext(); // get the local context for cursor
  if (localContext && localContext.context !== searchHelpSelection.value) searchHelpSelection.value = localContext.context; // update selected context
}

const handleKeydown = async (event: KeyboardEvent) => {
  if (event.key === 'Enter') { // submit the search and focus off the element
    event.preventDefault();
    focusRef.value = false;
    return await props.onSubmit(textRef.value);
  }
  
  if (event.key === 'Tab') { // tab completion for available hints
    return true;
  }
};

const handleClickOutsideSearch = (event: MouseEvent) => { // focus off search and hints if click outside of element
  const condition = every([
    searchInputRef.value && ! searchInputRef.value.contains(event.target as Node),
    searchHintsRef.value && ! searchHintsRef.value.contains(event.target as Node)
  ]);

  if (condition) focusOut();
};

const focusOut = () => {
  focusRef.value = false;
  
}

watch(textRef, text => {
  emit('update:text', text);
});

onMounted(() => { 
  document.addEventListener('click', handleClickOutsideSearch, true);
  if (props.contextMap) {
    for (const context of Object.keys(props.contextMap)) {
      usedContextMap.value[context] = { context, filters: new Set<string>() };
    }
  }
});

onBeforeUnmount(() => document.removeEventListener('click', handleClickOutsideSearch, true));
</script>

<template>

  <div class="v-search-container">

    <div :class="focusRef ? 'v-search-input v-input-focus' : 'v-search-input'">
      <input ref="searchInputRef"
        :value="textRef"
        :placeholder="placeholder"
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="focusRef = true">
    </div>

    <v-fade type="single">
      <div v-if="focusRef" ref="searchHintsRef" class="v-search-contexts">

        <h4>hints</h4>

        <div class="v-search-hints-elements">
          <v-button v-for="hint of displayHintsRef" :key="hint"
            :option="hint"
            :action="(hint: string) => console.log(hint)"
            :message="hint">
          </v-button>

          <p v-if="displayHintsRef.length === 0">...</p>
        </div>

        <h4>contexts</h4>

        <v-container orientation="horizontal">
          <v-button v-for="context of Object.keys(contextMap ?? {})" :key="context"
            :option="context"
            :action="(context: string) => console.log(context)"
            :message="context">
          </v-button>
        </v-container>

      </div>
    </v-fade>
    
  </div>
</template>

<style lang="scss">
@import '@uikit/components/v-search/v-search.scss';
</style>