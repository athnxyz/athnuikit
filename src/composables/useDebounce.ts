import type { Ref } from 'vue';
import { ref } from 'vue';


export const useDebounce = <T extends (...args: any[]) => any>() => {
  const timeoutId: Ref<ReturnType<typeof setTimeout> | null> = ref(null);

  const debounce = (actionFn: T, delay: number) => {
    return (...args: Parameters<T>) => {
      const later = async () => await actionFn(...args);
      clearTimeout(timeoutId.value as unknown as number);
      timeoutId.value = setTimeout(later, delay);
    }
  };

  return { debounce };
};