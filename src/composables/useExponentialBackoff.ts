import type { Ref } from 'vue';
import { ref } from 'vue';

import { sleep } from '@uikit/utils/utils';


const DEFAULT_DEPTH = 1;
const DEFAULT_TIMEOUT = 250;

export const useExponentialBackoff = <T extends (...args: any[]) => any>() => {
  const depth: Ref<number> = ref(DEFAULT_DEPTH);
  const timeout: Ref<number> = ref(DEFAULT_TIMEOUT);
  const backoffErr = ref<Error>();

  const backoff = (fn: T, retries: number) => {
    const resetDefaults = () => { 
      depth.value = DEFAULT_DEPTH;
      timeout.value = DEFAULT_TIMEOUT;
    };

    return (...args: Parameters<T>) => {
      const recursiveBackoff = async (): Promise<ReturnType<T>> => {
        try {
          if (depth.value > retries) throw new Error(`exceeded max retries: ${retries}`);
          return await fn(...args);
        } catch (err) {
          if (depth.value > retries) {
            resetDefaults();
            backoffErr.value = err as Error;
            
            throw err;
          }
  
          await sleep(timeout.value);

          timeout.value = 2 ** (depth.value) * DEFAULT_TIMEOUT;
          depth.value++;
  
          return await recursiveBackoff();
        }
      }

      return recursiveBackoff();
    }
  };

  return { backoff, backoffErr };
};