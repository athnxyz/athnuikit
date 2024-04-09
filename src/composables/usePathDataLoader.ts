import type { Ref } from 'vue';
import { ref, computed, onMounted } from 'vue';
import { last } from 'lodash';


export interface PathNode<T> {
  data: T;
  id: string;
  refId?: string;
  linkedNodes?: string[];
}


export const usePathDataLoader = <T>(
  rootData: T,
  extractIdFn: (data: T) => string,
  extractPrevIdFn: (data: T) => string | null,
  extractLinkedNodes: (data: T) => string[] | null,
  selectDataFn: (id: string) => Promise<T>,
) => {
  const path: Ref<PathNode<T>[]> = ref([]);
  const pathLoading: Ref<boolean> = ref(false);
  const pathErr = ref<Error>();

  const currNode: Ref<PathNode<T> | undefined> = computed(() => last(path.value));

  const handleRoot = (rootData: T) => {
    const selectedNode: PathNode<T> = {
      data: rootData,
      id: extractIdFn(rootData),
      linkedNodes: extractLinkedNodes(rootData) ?? undefined
    }

    path.value = [ ...path.value, selectedNode ];
  };

  const selectNode = async (selectedId: string) => {
    try {
      pathLoading.value = true;
      const selectedData: T = await selectDataFn(selectedId);
      
      if (selectedData) {
        const selectedNode: PathNode<T> = {
          data: selectedData,
          id: extractIdFn(selectedData),
          refId: extractPrevIdFn(selectedData) ?? undefined,
          linkedNodes: extractLinkedNodes(selectedData) ?? undefined
        }

        if (currNode.value?.id === selectedNode.id) return;
        if (selectedNode.refId && currNode.value?.id !== selectedNode.refId) await deselectNode(selectedNode.refId);
        
        path.value = [ ...path.value, selectedNode ];
      }
    } catch (err) {
      pathErr.value = err as Error;
    } finally { pathLoading.value = false; }
  };

  const deselectNode = async (refId?: string) => {
    if (refId) {
      const refNodeIndex = path.value.findIndex(node => node.id === refId);
      path.value = [ ...path.value.slice(0, refNodeIndex + 1) ];
    }
  };

  onMounted(async () => handleRoot(rootData));

  return { path, currNode, pathLoading, pathErr, selectNode };
}