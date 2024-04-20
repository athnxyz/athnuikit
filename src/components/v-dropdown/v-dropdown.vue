<script setup lang="ts">
import type { Ref } from 'vue';
import { ref, onBeforeUnmount, onMounted } from 'vue';
import { every } from 'lodash';

import type { DropdownEmits, DropdownProps, DropdownOption } from '@uikit/components/v-dropdown/v-dropdown.types';
import { useNavigateRoute } from '@uikit/composables/useNagivateRoute';
import { flow } from '@uikit/utils/flow';


defineProps<DropdownProps>();
const emit = defineEmits<DropdownEmits>();

const dropdownButton = ref<HTMLElement | undefined>();
const dropdownContainer = ref<HTMLElement | undefined>();
const isOpen: Ref<boolean> = ref(false);

const toggleDropdown = (option: boolean): boolean => ! option;

const { navigate } = useNavigateRoute();
const handleSelection = (option: DropdownOption): `/${string}`| undefined => {
  isOpen.value = toggleDropdown(isOpen.value);
  
  emit('update:selection', option.label);
  return option.route;
};

const handleClickOutsideDropdown = (event: MouseEvent) => {
  const condition = every([
    dropdownButton.value && ! dropdownButton.value.contains(event.target as Node),
    dropdownContainer.value && ! dropdownContainer.value.contains(event.target as Node)
  ]);

  if (condition) isOpen.value = toggleDropdown(isOpen.value);
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
      <div v-if="isOpen" 
        v-cloak
        ref="dropdownContainer" 
        class="v-dropdown-elements">
        <v-button v-for="o in options" :key="o.label"
          :option="o"
          :action="flow(
            () => handleSelection(o),
            (route?: `/${string}`) => {
              if (route) navigate(route);
              return true;
            }
          )"
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