/**
 * @summary Gestor de estado para Compras y Proveedores conectado a la API.
 * @author Gustavo Alonso Olivares Lao
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { PurchasingService } from '../infrastructure/purchasing.service.js';
import { PurchasingAssembler } from '../infrastructure/purchasing.assembler.js';

export const usePurchasingStore = defineStore('purchasing', () => {
    const claims = ref([]);
    const isLoading = ref(false);

    const service = new PurchasingService();
    const assembler = new PurchasingAssembler();

    const fetchClaims = async () => {
        isLoading.value = true;
        try {
            // Llamada real al backend en C#
            const response = await service.getClaims();

            // Mapeamos el JSON de respuesta hacia nuestras Entidades de Dominio
            claims.value = response.data.map(claim => assembler.toEntity(claim));
        } catch (error) {
            console.error('Error al conectar con la API de Compras:', error);
        } finally {
            isLoading.value = false;
        }
    };

    return { claims, isLoading, fetchClaims };
});