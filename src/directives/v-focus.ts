import type { App } from 'vue';
import { VDirective } from '@uikit/directives/directives.types';


export class VFocus extends VDirective<unknown> {
  loadDirective = (app: App, selector = 'focus', action = (el: HTMLElement) => el.focus()) => {
    this.__loadDirective(app, selector, action);
  };
}