<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';


const routerLinks = ref([
  { path: '/', label: 'about' },
  { path: '/vbutton', label: 'vbutton' },
  { path: '/vcomposables', label: 'vcomposables' },
  { path: '/vcontainer', label: 'vcontainer' },
  { path: '/vdropdown', label: 'vdropdown' },
  { path: '/vflow', label: 'vflow' },
  { path: '/vlist', label: 'vlist' },
  { path: '/vmasterview', label: 'vmasterview' },
  { path: '/vnav', label: 'vnav' },
  { path: '/vpath', label: 'vpath' },
  { path: '/vsearch', label: 'vsearch' },
  { path: '/vsidebar', label: 'vsidebar' },
  { path: '/vtag', label: 'vtag' },
  { path: '/vtitle', label: 'vtitle' }
]);
</script>

<template>

  <div class="app-container">
    <v-nav
      :title="{ title: 'athnuikit', subTitle: 'a vue component collection' }"
      :routerLinks="routerLinks">
    </v-nav>

    <div class="app-content">
      <RouterView></RouterView>
    </div>
  </div>

</template>

<style lang="scss">
@import '@uikit/v-common.scss';
@import '@uikit/App.scss';
</style>