# athnuikit


## a collection of components for vue 3

To view component showcase, go to the [github pages athnuikit showcase](https://athnxyz.github.io/athnuikit/)


## installation

In the root of your vue project, run:
```
npm install athnuikit
```


## usage

In your `main.ts` file, you can either import individual components/animations/composables/directives or use the included `VUIKitLoader`.

```ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VUIKitLoader } from 'athnuikit';

import App from '@app/App.vue';
import router from '@app/router';


const app = createApp(App);

app.use(createPinia());
app.use(router);

new VUIKitLoader().load(app); // this loads all included uikit functionality

app.mount('#app');
```


## available exports

```ts
import { 
  VUIKitLoader,

  flow,

  useDebounce,
  useExponentialBackoff,
  useLocalStorage,
  useNavigateRoute,
  usePathDataLoader,
  usePeriodicDataFetch,
  useResize,
  useScrollLoader,

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
  vsidebar,
  vtag,
  vtitle,
  vtext,

  vfade,
  vslidehorizontal,
  vslidevertical
} from 'athnuikit';
```

with more to come.


## todo

- complete testing of components