import type { App, Component } from 'vue';

import { 
  vbutton,
  vcontainer,
  vdarkmode,
  vdropdown,
  vinput,
  vlist,
  vmasterview,
  vnav,
  vnotification,
  vsidebar,
  vtag,
  vtitle,
  vtext,

  vfade,
  vslidehorizontal,
  vslidevertical
} from '@uikit/uikit';


interface ComponentRegistry {
  label: `v-${string}`;
  component: Component;
}

export class UIKitLoader {
  load(app: App<Element>) {
    const componentRegitryList: ComponentRegistry[] = [
      { label: 'v-button', component: vbutton },
      { label: 'v-container', component: vcontainer },
      { label: 'v-darkmode', component: vdarkmode },
      { label: 'v-dropdown', component: vdropdown },
      { label: 'v-input', component: vinput },
      { label: 'v-list', component: vlist },
      { label: 'v-master-view', component: vmasterview },
      { label: 'v-nav', component: vnav },
      { label: 'v-notification', component: vnotification },
      { label: 'v-sidebar', component: vsidebar },
      { label: 'v-tag', component: vtag },
      { label: 'v-title', component: vtitle },
      { label: 'v-text', component: vtext }
    ];

    const animationRegistryList: ComponentRegistry[] = [
      { label: 'v-fade', component: vfade },
      { label: 'v-slide-horizontal', component: vslidehorizontal },
      { label: 'v-slide-vertical', component: vslidevertical }
    ];

    componentRegitryList.forEach(cr => app.component(cr.label, cr.component));
    animationRegistryList.forEach(ar => app.component(ar.label, ar.component));
  }
}