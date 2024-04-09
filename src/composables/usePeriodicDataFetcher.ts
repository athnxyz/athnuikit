import type { Ref } from 'vue';
import { ref, onUnmounted, watch } from 'vue';


export const usePeriodicDataFetch = <T>(fetcher: Ref<(() => Promise<T>) | undefined>, timespanInMs: number) => {
  const data = ref<T>();
  const periodicError = ref<Error>();
  const loading: Ref<boolean> = ref(false);

  const fetchData = async () => {
    if (! fetcher.value) return;

    loading.value = true;
    periodicError.value = undefined;

    try { 
      const resp = await fetcher.value();
      if (resp) data.value = resp
    } catch (err) {
      periodicError.value = err as Error;
    } finally { loading.value = false; }
  };

  const interval = ref(setInterval(async () => { await fetchData(); }, timespanInMs));
  
  watch(fetcher, () => {
    clearInterval(interval.value);
    interval.value = setInterval(async () => { await fetchData(); }, timespanInMs);
  });

  onUnmounted(() => { clearInterval(interval.value) });

  return { data, loading, periodicError };
};