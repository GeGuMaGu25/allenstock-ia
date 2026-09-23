/**
 * @summary Gestor de estado para Compras y Proveedores usando Pinia.
 * @author Gustavo Alonso Olivares Lao
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { SupplierClaim } from '../domain/model/supplier-claim.entity.js';

export const usePurchasingStore = defineStore('purchasing', () => {
    const claims = ref([]);
    const isLoading = ref(false);

    const fetchClaims = async () => {
        isLoading.value = true;
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            // Simulamos reclamos autogenerados por mermas previas
            claims.value = [
                new SupplierClaim({
                    id: 101, kardex_id: 50, proveedor_id: 1, estado: 'Notificado', observaciones: 'Merma reportada por pantalla rota. Correo enviado a proveedor.'
                }),
                new SupplierClaim({
                    id: 102, kardex_id: 51, proveedor_id: 2, estado: 'En_Camino', fecha_envio_programado: '2026-09-30', observaciones: 'Cambio de lote vencido aprobado.'
                })
            ];
        } finally {
            isLoading.value = false;
        }
    };

    return { claims, isLoading, fetchClaims };
});