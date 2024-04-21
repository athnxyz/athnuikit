import type { App } from 'vue';

import FontAwesomeIcon from '@uikit/font-awesome.loader';

import { 
  VBlur,
  VFocus,

  vbutton,
  vcontainer,
  vdarkmode,
  vdropdown,
  vinput,
  vlist,
  vmasterview,
  vnav,
  vnotification,
  vpath,
  vsearch,
  vsidebar,
  vtag,
  vtitle,
  vtext,

  vfade,
  vslidehorizontal,
  vslidevertical
} from '@uikit/uikit';
import type { VDirective } from './directives/directives.types';


export class VUIKitLoader {
  load(app: App<Element>) {
    app.component('font-awesome-icon', FontAwesomeIcon);

    const directiveRegistryList: VDirective<unknown>[] = [
      new VBlur(),
      new VFocus()
    ];

    const componentRegitryList = [
      { label: 'v-button', component: vbutton },
      { label: 'v-container', component: vcontainer },
      { label: 'v-darkmode', component: vdarkmode },
      { label: 'v-dropdown', component: vdropdown },
      { label: 'v-input', component: vinput },
      { label: 'v-list', component: vlist },
      { label: 'v-master-view', component: vmasterview },
      { label: 'v-nav', component: vnav },
      { label: 'v-notification', component: vnotification },
      { label: 'v-path', component: vpath },
      { label: 'v-search', component: vsearch },
      { label: 'v-sidebar', component: vsidebar },
      { label: 'v-tag', component: vtag },
      { label: 'v-title', component: vtitle },
      { label: 'v-text', component: vtext }
    ];

    const animationRegistryList = [
      { label: 'v-fade', component: vfade },
      { label: 'v-slide-horizontal', component: vslidehorizontal },
      { label: 'v-slide-vertical', component: vslidevertical }
    ];

    directiveRegistryList.forEach(dr => dr.loadDirective(app));
    componentRegitryList.forEach(cr => app.component(cr.label, cr.component));
    animationRegistryList.forEach(ar => app.component(ar.label, ar.component));
  }
}