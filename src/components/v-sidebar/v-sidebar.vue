<script setup lang="ts">
import type { Ref } from 'vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { every } from 'lodash';

import type { SidebarProps } from '@uikit/components/v-sidebar/v-sidebar.types';


defineProps<SidebarProps>();

const sidebarButton: Ref<HTMLElement | null> = ref(null);
const sidebarContainer: Ref<HTMLElement | null> = ref(null);
const isOpen: Ref<boolean> = ref(false);

const toggleSidebar = (isOpen: boolean) => ! isOpen;
const handleClickOutsideSidebar = (event: MouseEvent) => {
  const condition = every([
    sidebarButton.value && ! sidebarButton.value.contains(event.target as Node),
    sidebarContainer.value && ! sidebarContainer.value.contains(event.target as Node)
  ]);

  if (condition) isOpen.value = toggleSidebar(isOpen.value); 
};

onMounted(() => document.addEventListener('click', handleClickOutsideSidebar, true));
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutsideSidebar, true));
</script>

<template>

  <div ref="sidebarButton">
    <v-button
      v-model:option="isOpen"
      :action="toggleSidebar"
      :icon="button.icon"
      :message="button.message"
      :overrideBtnClass="button.overrideBtnClass">
    </v-button>
  </div>

  <div v-if="isOpen" 
    ref="sidebarContainer" 
    :class="position === 'left' ? 'v-sidebar align-left' : 'v-sidebar align-right'">
    
    <v-button
      v-model:option="isOpen"
      :action="toggleSidebar"
      icon="fa-solid fa-close"
      overrideBtnClass="v-sidebar-close-button">
    </v-button>

    <div class="v-sidebar-divider"></div>
    
    <slot name="sidebar"></slot>

  </div>

</template>

<style lang="scss">
@import '@uikit/components/v-sidebar/v-sidebar.scss';
</style>