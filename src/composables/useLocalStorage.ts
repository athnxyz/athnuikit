import type { Ref } from 'vue';
import { ref } from 'vue';

import type { LocalStorageKey } from '@uikit/types/LocalStorage';


const genPrefixedKey = <PRF extends string, KEY extends string>(prefix: PRF, key: KEY): LocalStorageKey<PRF, KEY> => `${prefix}-${key}`;

export const useLocalStorage = <PRF extends string, KEY extends string>() => {
  const localStorageRef = ref(localStorage);
  const updateValueForKeyMap: Ref<Partial<{ [key in LocalStorageKey<PRF, KEY>]: boolean; }>> = ref({});

  const setItem = (prefix: PRF, key: KEY, value: string) => {
    const prefixedKey = genPrefixedKey(prefix, key);
    localStorageRef.value.setItem(prefixedKey, value);
    updateValueForKeyMap.value[prefixedKey] = true;
  };

  const getItem = (prefix: PRF, key: KEY): string | undefined => {
    const prefixedKey = genPrefixedKey(prefix, key); 
    const value = localStorageRef.value.getItem(prefixedKey);
    if (value) return value;
  };

  const deleteItem = (prefix: PRF, key: KEY) => {
    const prefixedKey = genPrefixedKey(prefix, key);
    localStorageRef.value.removeItem(prefixedKey);
    updateValueForKeyMap.value[prefixedKey] = true;
  }

  const clear = () => localStorageRef.value.clear();

  return { localStorageRef, updateValueForKeyMap, setItem, getItem, deleteItem, clear };
};