import { defineStore } from 'pinia';

import { useLocalStorage } from '@uikit/composables/useLocalStorage';


export const useLocalStorageStore = defineStore('local-storage', <PRF extends string, KEY extends string>() => {
  const { updateValueForKeyMap, setItem, getItem, deleteItem, clear } = useLocalStorage<PRF, KEY>();
  return { updateValueForKeyMap, setItem, getItem, deleteItem, clear };
});