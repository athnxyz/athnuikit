import type { Ref } from 'vue';


export const useResize = (elemRef: Ref<HTMLElement | undefined>) => {
  const updateHeight = (newHeight: number) => {
    if (elemRef.value) elemRef.value.style.height = newHeight + 'px';
  };

  const updateWidth = (newWidth: number) => {
    if (elemRef.value) elemRef.value.style.width = newWidth + 'px';
  };

  return { updateHeight, updateWidth };
};