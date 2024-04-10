<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { every } from 'lodash';

import type { SidebarProps } from '@uikit/components/v-sidebar/v-sidebar.types';
import { defaultSidebarProps } from '@uikit/components/v-sidebar/v-sidebar.types';


withDefaults(defineProps<SidebarProps>(), defaultSidebarProps);

const isOpen = ref<boolean>(false);
const sidebarButton = ref<HTMLElement | undefined>();
const sidebarContainer = ref<HTMLElement | undefined>();

const toggleSidebar = (current: boolean) => isOpen.value = ! current;

const handleClickOutsideSidebar = (event: MouseEvent) => {
  const condition = every([
    sidebarButton.value && ! sidebarButton.value.contains(event.target as Node),
    sidebarContainer.value && ! sidebarContainer.value.contains(event.target as Node)
  ]);

  if (condition) toggleSidebar(isOpen.value);
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
      :color="button.color"
      :bgColor="button.bgColor"
      :overrideBtnClass="button.overrideBtnClass">
    </v-button>
  </div>

  <v-slide-horizontal type="single">
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
      
      <slot name="sidebar" 
        :isOpen="isOpen" 
        :toggleSidebar="toggleSidebar">
      </slot>

    </div>
  </v-slide-horizontal>

</template>

<style lang="scss">
@import '@uikit/components/v-sidebar/v-sidebar.scss';
</style>