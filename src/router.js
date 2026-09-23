/**
 * @summary Configuración del enrutador de la SPA AllenStock AI.
 * @author Gustavo Alonso Olivares Lao
 */
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', redirect: '/login' }, // Ahora redirige al login
        {
            path: '/login',
            name: 'login',
            component: () => import('./iam/presentation/components/login-view.vue')
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('./shared/presentation/views/home.vue')
        },
        { path: '/catalog', component: () => import('./catalog/presentation/components/catalog-list.vue') },
        { path: '/inventory', component: () => import('./inventory/presentation/components/inventory-form.vue') },
        { path: '/pos', component: () => import('./sales/presentation/components/pos-view.vue') },
        { path: '/cash', component: () => import('./cash/presentation/components/cash-management.vue') },
        { path: '/analytics', component: () => import('./analytics/presentation/components/ai-dashboard.vue') },
        { path: '/purchasing', component: () => import('./purchasing/presentation/components/claims-dashboard.vue') }
    ]
});

export default router;