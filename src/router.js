/**
 * @summary Configuración del enrutador de la SPA AllenStock AI.
 * @author Gustavo Alonso Olivares Lao
 */
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', redirect: '/home' },
        {
            path: '/home',
            name: 'home',
            component: () => import('./shared/presentation/views/home.vue')
        }
    ]
});

export default router;