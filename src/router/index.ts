import { createRouter, createWebHistory } from 'vue-router'

import about from '@uikit/views/about.vue';
import vbuttonview from '@uikit/views/v-button-view.vue';
import vcontainerview from '@uikit/views/v-container-view.vue';
import vdropdownview from '@uikit/views/v-dropdown-view.vue';
import vnavview from '@uikit/views/v-nav-view.vue';
import vsidebarview from '@uikit/views/v-sidebar-view.vue';
import vtagview from '@uikit/views/v-tag-view.vue';
import vtitleview from '@uikit/views/v-title-view.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/vbutton',
      name: 'vbutton',
      component: vbuttonview
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
      path: '/vnav',
      name: 'vnav',
      component: vnavview
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