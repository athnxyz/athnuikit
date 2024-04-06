import type { App, Component } from 'vue';

import { 
  vbutton,
  vcontainer,
  vdropdown,
  vnav,
  vnotification,
  vsidebar,
  vtag,
  vtitle,
  vtext
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
      { label: 'v-dropdown', component: vdropdown },
      { label: 'v-nav', component: vnav },
      { label: 'v-notification', component: vnotification },
      { label: 'v-sidebar', component: vsidebar },
      { label: 'v-tag', component: vtag },
      { label: 'v-title', component: vtitle },
      { label: 'v-text', component: vtext },
    ];

    componentRegitryList.forEach(cr => app.component(cr.label, cr.component));
  }
}