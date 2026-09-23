/**
 * @summary Gestor de estado para la Caja usando Pinia.
 * @author Gustavo Alonso Olivares Lao
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { CashService } from '../infrastructure/cash.service.js';
import { CashAssembler } from '../infrastructure/cash.assembler.js';

export const useCashStore = defineStore('cash', () => {
    const currentSession = ref(null);
    const isProcessing = ref(false);

    const service = new CashService();
    const assembler = new CashAssembler();

    const openCash = async (initialAmount) => {
        isProcessing.value = true;
        try {
            // Simulamos la respuesta del backend
            await new Promise(resolve => setTimeout(resolve, 800));
            currentSession.value = assembler.toEntity({
                id: 1, usuario_id: 99, monto_inicial: initialAmount, estado: 'Abierta'
            });
            return { success: true, message: 'Caja abierta exitosamente.' };
        } catch (error) {
            return { success: false, message: 'Error al abrir caja.' };
        } finally {
            isProcessing.value = false;
        }
    };

    const closeCash = async (realAmount) => {
        isProcessing.value = true;
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const expected = currentSession.value.expectedFinalAmount;
            const difference = realAmount - expected;

            currentSession.value.status = 'Cerrada';
            return {
                success: true,
                message: difference === 0 ? 'Caja cuadrada perfectamente.' : `Descuadre detectado: S/ ${difference.toFixed(2)}`
            };
        } finally {
            isProcessing.value = false;
        }
    };

    return { currentSession, isProcessing, openCash, closeCash };
});