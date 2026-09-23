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
        },
        {
            path: '/catalog',
            name: 'catalog',
            component: () => import('./catalog/presentation/components/catalog-list.vue')
        },
        // Nueva ruta para nuestro módulo de Inventario
        {
            path: '/inventory',
            name: 'inventory',
            component: () => import('./inventory/presentation/components/inventory-form.vue')
        },
        {
            path: '/pos',
            name: 'pos',
            component: () => import('./sales/presentation/components/pos-view.vue')
        },
        {
            path: '/cash',
            name: 'cash',
            component: () => import('./cash/presentation/components/cash-management.vue')
        },
        {
            path: '/analytics',
            name: 'analytics',
            component: () => import('./analytics/presentation/components/ai-dashboard.vue')
        },
        {
            path: '/purchasing',
            name: 'purchasing',
            component: () => import('./purchasing/presentation/components/claims-dashboard.vue')
        }
    ]
});

export default router;