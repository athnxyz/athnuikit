<script setup lang="ts">
import { useDark } from '@vueuse/core';


const isDark = useDark();
const toggleDark = () => isDark.value = ! isDark.value;
</script>

<template>

  <v-button 
    v-model:option="isDark"
    :action="toggleDark"
    :icon="isDark ? 'fa-solid fa-toggle-on' : 'fa-solid fa-toggle-off'"
    color="var(--v-text-secondary)"
    bgColor="inherit">
  </v-button>
  
</template>

<style lang="scss">
@import '@uikit/components/v-darkmode/v-darkmode.scss';
</style>