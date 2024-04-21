<script setup lang="ts">
import { ref } from 'vue';


const textRef = ref<string>('');
const contextMapRef = ref({
  id: {
    context: 'id',
    help: 'the id to search for',
    filters: [ 1, 2, 3 ]
  },
  group: {
    context: 'animals',
    help: '',
    filters: [ 'cat', 'cow', 'dog', 'dolphin', 'eagle']
  }
})

const onSubmit = async (text: string): Promise<boolean> => {
  console.log('submitting:', text);
  return true;
}

const searchShowcaseContainerStyle = ref({
  'align-items': 'center'
});

const searchDetailListItems = ref([
  { key: 'v-model:text: string', content: 'the search string' }
]);

const implementation = ref(`<v-search v-model:text="inputRef"></v-search>`);
</script>

<template>

  <v-container orientation="vertical">

    <v-container orientation="vertical" border>
      <v-title title="vsearch" border></v-title>
      <v-list 
        :items="searchDetailListItems"
        :extractKeyFn="(key: string) => key">

        <template #key="{ key }">
          {{ key }}
        </template>

        <template #content="{ content }">
          {{  content  }}
        </template>
        
      </v-list>
    </v-container>
    
    <v-container 
      orientation="vertical"
      :style="searchShowcaseContainerStyle">
      
      <v-search 
        v-model:text="textRef"
        :onSubmit="onSubmit"
        :contextMap="contextMapRef">
      </v-search>

    </v-container>

    <v-container orientation="vertical" border>
      <v-title title="implementation" border></v-title>
      <v-input v-model:value="implementation" disabled></v-input>
    </v-container>

  </v-container>

</template>

<style lang="scss">
@import '@uikit/views/view.scss';
</style>