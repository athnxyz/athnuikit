import type { App, DirectiveBinding } from 'vue';

import { VDirective } from '@uikit/directives/directives.types';


export class VBlur extends VDirective<any> {
  loadDirective = (app: App, selector = 'blur', action = (el: HTMLElement, binding: DirectiveBinding<boolean>) => {
    if (binding?.value === true) el.style.backdropFilter = 'blur(5px)';
    else el.style.backdropFilter = 'none';
  }) => { this.__loadDirective(app, selector, action); };
}