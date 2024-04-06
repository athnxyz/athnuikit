<script setup lang="ts">
import { RouterView } from 'vue-router'


const routerLinks = [
  { path: '/about', label: 'about' },
  { path: '/vbutton', label: 'vbutton' },
  { path: '/vcontainer', label: 'vcontainer' },
  { path: '/vdropdown', label: 'vdropdown' },
  { path: '/vnav', label: 'vnav' },
  { path: '/vsidebar', label: 'vsidebar' },
  { path: '/vtag', label: 'vtag' },
  { path: '/vtitle', label: 'vtitle' }
];

const appViewStyle = {
  height: '100%',
  border: 'none',
  'border-radius': '0.25rem',
  'overflow-y': 'scroll'
};
</script>

<template>

  <v-container
    orientation="vertical"
    :style="appViewStyle">

    <v-nav
      :title="{ title: 'vuikit' }"
      :routerLinks="routerLinks">
    </v-nav>

    <RouterView></RouterView>

  </v-container>

</template>

<style lang="scss">
@import '@uikit/assets/base.scss';
@import '@uikit/App.scss';
</style>