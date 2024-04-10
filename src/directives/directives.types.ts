import type { App, DirectiveBinding } from 'vue';


type DirectiveAction<T> = T extends unknown 
  ? (el: HTMLElement) => void 
  : (el: HTMLElement, binding: DirectiveBinding<T>) => void;

export abstract class VDirective<T> {
  abstract loadDirective(app: App, selector?: string, action?: DirectiveAction<T extends infer R ? R : never>): void

  protected __loadDirective = (app: App, selector: string, action: (el: HTMLElement, binding: DirectiveBinding<T>) => void) => {
    app.directive(selector, action);
  }
}