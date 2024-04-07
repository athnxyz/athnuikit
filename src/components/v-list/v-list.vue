<script setup lang="ts">
import type { ListProps } from '@uikit/components/v-list/v-list.types';


defineProps<ListProps>();
const defaultIcon = 'fa-solid fa-check-circle'
</script>

<template>

  <div class="v-list">

    <v-fade type="group" tag="ul">
      <li v-for="item of items" :key="item.key" class="v-list-item">
        <font-awesome-icon :icon="icon ? icon : defaultIcon"></font-awesome-icon>
        <div class="v-list-item-key">[{{ item.key }}]</div> {{  item.content }}
      </li>
    </v-fade>

  </div>

</template>

<style lang="scss">
@import '@uikit/components/v-list/v-list.scss';
</style>