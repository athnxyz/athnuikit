import type { Ref } from 'vue';
import { ref, watchEffect, onMounted, onUnmounted } from 'vue';


export const usePaginatedScrollLoader = <T>(
  loadPageFn: (page: number) => Promise<T[]>,
  scrollableElementRef: Ref<HTMLElement | null>
) => {
  const items: Ref<T[]> = ref([]);
  const currPage: Ref<number> = ref(0);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<Error | null> = ref(null);

  const onPaginate = async () => {
    if (! scrollableElementRef.value || loading.value) return;

    const element = scrollableElementRef.value;
    const scrollPosition = element?.scrollTop;
    const bottomPosition = element.scrollHeight - element.clientHeight;
    
    if (scrollPosition >= bottomPosition - 100) { // 100 is a threshold to trigger before exactly reaching the bottom
      try {
        loading.value = true;
        const nextItems = await loadPageFn(currPage.value + 1);

        if (nextItems?.length > 0) { 
          items.value = [ ...nextItems ];
          currPage.value++;
        }
      } catch (err) { 
        error.value = err as Error;
      } finally { loading.value = false; }
    }
    
    // Load previous page when scrolled to top
    if (scrollPosition <= 100 && currPage.value > 0) { // Similar threshold for the top
      try {
        loading.value = true;
        const prevItems = await loadPageFn(currPage.value - 1);

        if (prevItems?.length > 0) { 
          items.value = [ ...prevItems ];
          currPage.value--;
        }
      } catch (err) { 
        error.value = err as Error;
      } finally { loading.value = false; }
    }
  }

  onMounted(async () => {
    items.value = await loadPageFn(currPage.value);
  })

  watchEffect(async () => {
    if (scrollableElementRef.value) {
      scrollableElementRef.value.addEventListener('scroll', onPaginate);
    }
  });

  onUnmounted(() => {
    if (scrollableElementRef.value) scrollableElementRef.value.removeEventListener('scroll', onPaginate);
  });

  return { items, loading, error };
};