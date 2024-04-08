import { type Ref, ref, onUnmounted, watch } from 'vue';


export const usePeriodicDataFetch = <T>(timespanInMs: number, fetcher: Ref<(() => Promise<T>) | undefined>) => {
  const data = ref<T>();
  const error = ref<Error>();
  const loading: Ref<boolean> = ref(false);

  const fetchData = async () => {
    if (! fetcher.value) return;

    loading.value = true;
    error.value = undefined;

    try { 
      const resp = await fetcher.value();
      if (resp) data.value = resp
    } catch (err: any) {
      error.value = err as Error;
    } finally { loading.value = false; }
  };

  const interval = ref(setInterval(async () => { await fetchData(); }, timespanInMs));
  
  watch(fetcher, () => {
    clearInterval(interval.value);
    interval.value = setInterval(async () => { await fetchData(); }, timespanInMs);
  });

  onUnmounted(() => { clearInterval(interval.value) });

  return { data, loading, error };
};