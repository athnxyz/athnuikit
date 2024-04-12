import { createApp } from 'vue';
import { createPinia } from 'pinia';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import App from '@uikit/App.vue';
import router from '@uikit/router';

import FontAwesomeIcon from '@uikit/font-awesome.loader';
import { VUIKitLoader } from '@uikit/uikit.loader';


const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.component('font-awesome-icon', FontAwesomeIcon);

new VUIKitLoader().load(app);

app.mount('#app');