import type { Ref } from 'vue';
import { ref } from 'vue';


export const useDebounce = <T extends (...args: any[]) => any>() => {
  const timeoutId: Ref<ReturnType<typeof setTimeout> | null> = ref(null);
  const debounceErr = ref<Error>();

  const debounce = (actionFn: T, delay: number) => {
    return (...args: Parameters<T>) => {
      const debounceCallback = async () => {
        try {
          await actionFn(...args);
        } catch (err) { debounceErr.value = err as Error; }
      };

      clearTimeout(timeoutId.value as unknown as number);
      timeoutId.value = setTimeout(debounceCallback, delay);
    }
  };

  return { debounce, debounceErr };
};

