<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';


const routerLinks = ref([
  { path: '/', label: 'about' },
  { path: '/vbutton', label: 'vbutton' },
  { path: '/vcomposables', label: 'vcomposables' },
  { path: '/vcontainer', label: 'vcontainer' },
  { path: '/vdropdown', label: 'vdropdown' },
  { path: '/vmasterview', label: 'vmasterview' },
  { path: '/vnav', label: 'vnav' },
  { path: '/vpath', label: 'vpath' },
  { path: '/vsidebar', label: 'vsidebar' },
  { path: '/vtag', label: 'vtag' },
  { path: '/vtitle', label: 'vtitle' }
]);
</script>

<template>

  <div class="app-container">
    <v-nav
      :title="{ title: 'vuikit', subTitle: 'a vue component collection' }"
      :routerLinks="routerLinks">
    </v-nav>

    <div class="app-content">
      <RouterView></RouterView>
    </div>
  </div>

</template>

<style lang="scss">
@import '@uikit/assets/base.scss';
@import '@uikit/App.scss';
</style>