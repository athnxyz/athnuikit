import { createRouter, createWebHistory } from 'vue-router'

import about from '@uikit/views/about.vue';
import vbuttonview from '@uikit/views/v-button-view.vue';
import vcomposables from '@uikit/views/v-composables.vue';
import vcontainerview from '@uikit/views/v-container-view.vue';
import vflowview from '@uikit/views/v-flow-view.vue';
import vlistview from '@uikit/views/v-list-view.vue'
import vmasterviewv from '@uikit/views/v-master-view.vue'
import vdropdownview from '@uikit/views/v-dropdown-view.vue';
import vnavview from '@uikit/views/v-nav-view.vue';
import vpathview from '@uikit/views/v-path-view.vue';
import vsidebarview from '@uikit/views/v-sidebar-view.vue';
import vtagview from '@uikit/views/v-tag-view.vue';
import vtitleview from '@uikit/views/v-title-view.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'about',
      component: about
    },
    {
      path: '/vbutton',
      name: 'vbutton',
      component: vbuttonview
    },
    {
      path: '/vcomposables',
      name: 'vcomposables',
      component: vcomposables
    },
    {
      path: '/vcontainer',
      name: 'vcontainer',
      component: vcontainerview
    },
    {
      path: '/vdropdown',
      name: 'vdropdown',
      component: vdropdownview
    },
    {
      path: '/vflow',
      name: 'vflow',
      component: vflowview
    },
    {
      path: '/vlist',
      name: 'vlist',
      component: vlistview
    },
    {
      path: '/vmasterview',
      name: 'vmasterview',
      component: vmasterviewv
    },
    {
      path: '/vnav',
      name: 'vnav',
      component: vnavview
    },
    {
      path: '/vpath',
      name: 'vpath',
      component: vpathview
    },
    {
      path: '/vsidebar',
      name: 'vsidebar',
      component: vsidebarview
    },
    {
      path: '/vtag',
      name: 'vtag',
      component: vtagview
    },
    {
      path: '/vtitle',
      name: 'vtitle',
      component: vtitleview
    }
  ]
});

export default router;