<script setup lang="ts">
import type { Ref } from 'vue';
import { onMounted, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';

import type { NotificationProps } from '@uikit/components/v-notification/v-notification.types';
import { defaultNotificationProps } from '@uikit/components/v-notification/v-notification.types';


const props = withDefaults(defineProps<NotificationProps>(), defaultNotificationProps);

const toast = useToast();
const firstUpdateComplete: Ref<boolean> = ref(false);

onMounted(() => {
  watch(
    () => props,
    curr => {
      if (firstUpdateComplete.value) {
        toast.add({ 
          severity: curr.severity, 
          summary: curr.summary, 
          detail: curr.detail, 
          life: curr.timeToLive 
        });
      } else { firstUpdateComplete.value = true; }
    }, 
    { deep: true, immediate: false }
  );
});
</script>

<template>

  <Toast v-cloak position="bottom-left" class="v-notification" />

</template>

<style lang="scss">
@import '@uikit/components/v-notification/v-notification.scss';
</style>