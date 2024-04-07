<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router'


const routerLinks = ref([
  { path: '/about', label: 'about' },
  { path: '/vbutton', label: 'vbutton' },
  { path: '/vcontainer', label: 'vcontainer' },
  { path: '/vdropdown', label: 'vdropdown' },
  { path: '/vmasterview', label: 'vmasterview' },
  { path: '/vnav', label: 'vnav' },
  { path: '/vsidebar', label: 'vsidebar' },
  { path: '/vtag', label: 'vtag' },
  { path: '/vtitle', label: 'vtitle' }
]);

const appViewStyle = { height: '100%' };
</script>

<template>

  <v-nav
    :title="{ title: 'vuikit', subTitle: 'a vue component collection' }"
    :routerLinks="routerLinks">
  </v-nav>

  <v-container
    orientation="vertical"
    :border="false"
    :style="appViewStyle">

    <RouterView></RouterView>

  </v-container>

</template>

<style lang="scss">
@import '@uikit/assets/base.scss';
@import '@uikit/App.scss';
</style>