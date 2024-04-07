<script setup lang="ts">
import type { NavProps } from '@uikit/components/v-nav/v-nav.types';


defineProps<NavProps>();
</script>

<template>

  <div class="v-nav-container">
    <div class="v-nav-title">
      <v-title :title="title.title" :subTitle="title.subTitle"></v-title>
      <font-awesome-icon v-if="title?.icon" :icon="title.icon"></font-awesome-icon>
    </div>

    <div class="v-nav-router">
      <RouterLink v-for="route in routerLinks" class="v-nav-router-link" 
        :to="route.path">
        {{ route.label }}
      </RouterLink>
    </div>

    <div class="v-nav-actions">
      <v-darkmode></v-darkmode>
      <slot name="actions"></slot>
    </div>
  </div>
  
</template>

<style lang="scss">
@import '@uikit/components/v-nav/v-nav.scss';
</style>