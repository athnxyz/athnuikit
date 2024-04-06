<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';

import type { NotificationProps } from '@uikit/components/v-notification/v-notification.types';


const props = defineProps<NotificationProps>();

const toast = useToast();
const firstUpdateComplete = ref(false);

onMounted(() => {
  watch(
    () => props,
    (curr, prev) => {
      if (firstUpdateComplete.value) {
        const life = curr?.timeToLive ?? 3000
        toast.add({ severity: curr.severity, summary: curr.summary, detail: curr.detail, life });
      } else { firstUpdateComplete.value = true; }
    }, 
    { deep: true, immediate: false }
  );
});
</script>

<template>

  <Toast position="bottom-left" class="v-notification" />

</template>

<style lang="scss">
@import '@uikit/components/v-notification/v-notification.scss';
</style>