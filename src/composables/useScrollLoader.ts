import type { Ref } from 'vue';
import { ref, watchEffect, onMounted, onUnmounted } from 'vue';


export const useScrollLoader = <T>(loadPageFn: (page: number) => Promise<T[]>, scrollableElementRef: Ref<HTMLElement | undefined>) => {
  const items: Ref<T[]> = ref([]); // ref to current items in view
  const prevItems: Ref<T[]> = ref([]); // ref to previous loaded items in view
  const currPage: Ref<number> = ref(0); // the current page
  const loading: Ref<boolean> = ref(false);
  const scrollError = ref<Error>();
  const scrollEnd: Ref<boolean> = ref(false);

  const updateItems = async (incrPageFwd: boolean) => {
    try {
      if (scrollEnd.value !== true ) loading.value = true;

      const nextItems = await loadPageFn(incrPageFwd ? currPage.value + 1 : currPage.value - 1);

      if (nextItems?.length > 0) {
        if (incrPageFwd) {
          items.value = [ ...(prevItems.value?.length > 0 ? prevItems.value : items.value), ...nextItems ];
          currPage.value++;
        } else {
          items.value = [ ...nextItems, ...prevItems.value ];
          currPage.value--;
        }

        prevItems.value = nextItems;
      } else { scrollEnd.value = true; }
    } catch (err) { 
      scrollError.value = err as Error;
    } finally { loading.value = false; }
  };

  const onPaginate = async () => {
    if (! scrollableElementRef.value || loading.value) return;

    const element = scrollableElementRef.value; // get the scrollable element
    const scrollPosition = element.scrollTop; // get the scroll position
    const bottomPosition = element.scrollHeight - element.clientHeight; // get the bottom position of the window for overflow
    
    if (scrollPosition >= bottomPosition - 100) await updateItems(true); // handle scroll forward
    if (scrollPosition <= 100 && currPage.value > 0) await updateItems(false); // handle scroll down
  };

  watchEffect(() => {
    if (scrollableElementRef.value) scrollableElementRef.value.addEventListener('scroll', onPaginate);
  });

  onMounted(async () => { items.value = await loadPageFn(currPage.value); });

  onUnmounted(() => { 
    if (scrollableElementRef.value) scrollableElementRef.value.removeEventListener('scroll', onPaginate);
  });

  return { items, loading, scrollEnd, scrollError };
};