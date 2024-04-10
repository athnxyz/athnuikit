<script setup lang="ts" generic="T">
import type { PathProps } from '@uikit/components/v-path/v-path.types';
import { usePathDataLoader} from '@uikit/composables/usePathDataLoader';


const props = defineProps<PathProps<T>>();

const { path, currNode, selectNode } = usePathDataLoader(
  props.rootData,
  props.extractIdFn,
  props.extractPrevIdFn,
  props.extractLinkedNodes,
  props.selectDataFn
);
</script>

<template>

  <div class="v-path">
    
    <div class="v-path-nodes">

      <v-fade type="group">
        <div v-for="node in path" 
          :key="node.id"
          v-cloak
          class="v-node">
          
          <v-title :title="node.id"></v-title>

          <template v-if="node.linkedNodes">
            <v-button v-for="link in node.linkedNodes"
              :key="link"
              :option="link"
              :message="link"
              :action="selectNode">
            </v-button>
          </template>

        </div>
      </v-fade>

    </div>

    <div class="v-path-node-data">
      <slot v-if="currNode" name="nodeDataView" :data="currNode.data"></slot>
    </div>

  </div>

</template>

<style lang="scss">
@import '@uikit/components/v-path/v-path.scss';
</style>