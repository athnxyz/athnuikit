<script setup lang="ts" generic="T, V">
import type { Ref } from 'vue';
import { ref, watch, onMounted, onUnmounted } from 'vue';

import type { MasterViewEmits, MasterViewProps } from '@uikit/components/v-master-view/v-master-view.types';
import { defaultKeyViewStyle, defaultViewWidths } from '@uikit/components/v-master-view/v-master-view.types';
import { useDebounce } from '@uikit/composables/useDebounce';
import { useResize } from '@uikit/composables/useResize';
import { useScrollLoader } from '@uikit/composables/useScrollLoader';


const props = defineProps<MasterViewProps<T, V>>();
const emit = defineEmits<MasterViewEmits<T>>();

const masterViewRef = ref<HTMLElement | undefined>();
const masterKeyViewRef = ref<HTMLElement | undefined>();
const keyViewHeight = ref<number>(0);
  const keyViewStyle = ref({ 
  width: props.viewWidths?.keyView ?? defaultViewWidths.keyView,
  ...defaultKeyViewStyle
});

const dataRef: Ref<V | null> = ref(null);
const error = ref<Error>();

const { debounce } = useDebounce<(key: T) => Promise<void>>();
const { items, loading, scrollError } = useScrollLoader(props.loadKeysFn, masterKeyViewRef);

const onSelect = async (key: T) => {
  try {
    const extractedKey = props.extractKeyFn(key);
    dataRef.value = await props.getDataFn(extractedKey);

    emit('update:selectedKey', key);
  } catch (err) { error.value = err as Error; }
};

const debounceOnSelect = debounce(onSelect, 200);

const observer = new ResizeObserver(entries => {
  for (let entry of entries) { keyViewHeight.value = entry.target.scrollHeight; }
});

onMounted(() => {
  const { updateHeight } = useResize(masterViewRef);

  if (masterKeyViewRef.value) { 
    observer.observe(masterKeyViewRef.value);
    watch(keyViewHeight, height => {
      if (masterViewRef.value && height) { 
        if (! masterViewRef.value?.clientHeight || masterViewRef.value?.clientHeight >= height) updateHeight(Math.floor(height * 0.95)) 
      }
    });
  }
});

onUnmounted(() => {
  if (masterKeyViewRef.value) observer.unobserve(masterKeyViewRef.value);
});
</script>

<template>

  <div ref="masterViewRef"
    class="v-master-view">

    <div ref="masterKeyViewRef" 
      class="v-master-view-keys" 
      :style="keyViewStyle">

      <div v-for="key of items" :key="extractKeyFn(key)"
        :class="selectedKey === key ? 'v-master-view-key v-master-view-selection' : 'v-master-view-key'"
        @click="debounceOnSelect(key)">
        <div v-cloak class="v-master-view-key-slot">
          <slot name="keyview" :key="key"></slot>
        </div>
      </div>

      <font-awesome-icon v-if="loading" 
        class="spinner" 
        icon="fa-solid fa-spinner">
      </font-awesome-icon>

    </div>

    <div v-cloak
      class="v-master-view-data" 
      :style="{ width: viewWidths?.dataView ?? defaultViewWidths.dataView }">

      <slot v-if="dataRef" name="dataview" :data="dataRef"></slot>
      <v-text v-else>select a key to view associated data</v-text>

    </div>

  </div>

</template>

<style lang="scss">
@import '@uikit/components/v-master-view/v-master-view.scss';
</style>