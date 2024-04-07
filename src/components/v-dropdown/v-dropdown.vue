<script setup lang="ts" generic="T">
import type { Ref } from 'vue';
import { ref, onBeforeUnmount, onMounted } from 'vue';

import type { DropdownEmits, DropdownProps, DropdownOption } from '@uikit/components/v-dropdown/v-dropdown.types';


const props = defineProps<DropdownProps>();
const emit = defineEmits<DropdownEmits<T>>();

const dropdownButton: Ref<HTMLElement | null> = ref(null);
const dropdownContainer: Ref<HTMLElement | null> = ref(null);

const isOpen: Ref<boolean> = ref(false);

const toggleDropdown = (isOpen: boolean) => ! isOpen;
const handleSelection = async (selection: DropdownOption) => { 
  await selection.action();
  emit('update:options', selection);
};

const handleClickOutsideDropdown = (event: MouseEvent) => {
  if (
    (dropdownButton.value && ! dropdownButton.value.contains(event.target as Node)) 
    && (dropdownContainer.value && ! dropdownContainer.value.contains(event.target as Node))
  ) { isOpen.value = toggleDropdown(isOpen.value); }
};

onMounted(() => document.addEventListener('click', handleClickOutsideDropdown, true));
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutsideDropdown, true));
</script>

<template>

  <div class="v-dropdown">

    <div ref="dropdownButton" class="v-dropdown-button">
      <v-button
        v-model:option="isOpen"
        :action="toggleDropdown"
        :icon="button.icon"
        :message="button.message"
        :color="button.color"
        :bgColor="button.bgColor"
        :overrideBtnClass="button.overrideBtnClass">
      </v-button>
    </div>

    <v-slide-vertical type="single">
      <div v-if="isOpen" ref="dropdownContainer" class="v-dropdown-elements">
        <v-button v-for="o in options"
          :option="o"
          :action="handleSelection"
          :message="o.label"
          :icon="o.icon"
          overrideBtnClass="v-dropdown-element">
        </v-button>
      </div>
    </v-slide-vertical>

  </div>

</template>

<style lang="scss">
@import '@uikit/components/v-dropdown/v-dropdown.scss';
</style>