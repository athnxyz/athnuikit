<script setup lang="ts" generic="T, V">
import { ref } from 'vue';

import type { ListProps } from '@uikit/components/v-list/v-list.types';


defineProps<ListProps<T, V>>();
const defaultIcon = ref('fa-solid fa-check-circle');
</script>

<template>

  <div class="v-list">
    
    <v-fade type="group" tag="ul">
      <li v-for="item of items" :key="extractKeyFn(item.key)" class="v-list-item">
        
        <font-awesome-icon :icon="icon ? icon : defaultIcon"></font-awesome-icon>
        <div v-cloak class="v-list-item-key">
          <slot name="key" :key="item.key"></slot>
        </div>
        <slot v-cloak name="content"
          :content="item.content">
        </slot>

      </li>
    </v-fade>
  
  </div>

</template>

<style lang="scss">
@import '@uikit/components/v-list/v-list.scss';
</style>