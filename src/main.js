/**
 * @summary Punto de entrada principal de la aplicación web.
 * @author Gustavo Alonso Olivares Lao
 */
import { createApp } from 'vue';
import App from './App.vue';
import pinia from './pinia.js';
import router from './router.js';

import PrimeVue from 'primevue/config';
import Material from '@primevue/themes/material';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import { Button, Card, Toolbar } from 'primevue';

const app = createApp(App);

app.use(PrimeVue, {
    theme: { preset: Material },
    ripple: true
});

app.component('pv-button', Button);
app.component('pv-card', Card);
app.component('pv-toolbar', Toolbar);

app.use(pinia);
app.use(router);

app.mount('#app');
