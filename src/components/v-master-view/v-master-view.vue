<script setup lang="ts" generic="T, V">
import type { Ref } from 'vue';
import { ref } from 'vue';

import type { MasterViewEmits, MasterViewProps } from '@uikit/components/v-master-view/v-master-view.types';
import { defaultKeyViewStyle, defaultViewWidths } from '@uikit/components/v-master-view/v-master-view.types';
import { useScrollLoader } from '@uikit/composables/useScrollLoader';


const props = defineProps<MasterViewProps<T, V>>();
const emit = defineEmits<MasterViewEmits<T>>();

const masterKeyViewRef = ref<HTMLElement | undefined>();
const dataRef: Ref<V | null> = ref(null);
const keyViewStyle = ref({ 
  width: props.viewWidths?.keyView ?? defaultViewWidths.keyView,
  ...defaultKeyViewStyle
});

const onSelect = async (key: T) => {
  try {
    const extractedKey = props.extractKeyFn(key);
    dataRef.value = await props.getDataFn(extractedKey);

    emit('update:selectedKey', key);
  } catch (err) { error.value = err as Error; }
};

const { items, loading, error } = useScrollLoader(props.loadKeysFn, masterKeyViewRef);
</script>

<template>

  <div class="v-master-view">

    <div ref="masterKeyViewRef" 
      class="v-master-view-keys" 
      :style="keyViewStyle">

      <v-text v-if="loading">loading keys...</v-text>
      <div v-for="key of items" 
        :class="selectedKey === key ? 'v-master-view-key v-master-view-selection' : 'v-master-view-key'"
        @click="onSelect(key)">
        <div class="v-master-view-key-slot">
          <slot name="keyview" :key="key"></slot>
        </div>
      </div>

    </div>

    <div class="v-master-view-data" 
      :style="{ width: viewWidths?.dataView ?? defaultViewWidths.dataView }">

      <slot v-if="dataRef" name="dataview" :data="dataRef"></slot>
      <v-text v-else>select a key to view associated data</v-text>

    </div>

  </div>

</template>

<style lang="scss">
@import '@uikit/components/v-master-view/v-master-view.scss';
</style>