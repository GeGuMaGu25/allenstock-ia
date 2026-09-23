/**
 * @summary Gestor de estado para el sub-dominio Inventario usando Pinia.
 * @author Gustavo Alonso Olivares Lao
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { InventoryService } from '../infrastructure/inventory.service.js';
import { KardexAssembler } from '../infrastructure/kardex.assembler.js';

export const useInventoryStore = defineStore('inventory', () => {
    const isProcessing = ref(false);
    const service = new InventoryService();
    const assembler = new KardexAssembler();

    /**
     * @summary Simula el registro de una merma de inventario.
     * @param {Number} productId - ID del producto afectado.
     * @param {Number} quantity - Cantidad mermada.
     */
    const registrarMerma = async (productId, quantity) => {
        isProcessing.value = true;
        try {
            const payload = {
                producto_id: productId,
                tipo_movimiento: 'Salida',
                cantidad: quantity,
                motivo: 'Merma'
            };

            // Convertimos el payload a una entidad formal usando el assembler
            const entity = assembler.toEntity(payload);

            // Aquí ocurriría la llamada real: await service.registerMovement(entity);
            console.log('Emitiendo evento MermaRegistrada al backend para:', entity);

            // Simulamos una demora de red
            await new Promise(resolve => setTimeout(resolve, 800));
            return { success: true, message: 'Merma registrada exitosamente. Notificando a compras...' };
        } catch (error) {
            console.error('Error al registrar merma:', error);
            return { success: false, message: 'Fallo al procesar el inventario.' };
        } finally {
            isProcessing.value = false;
        }
    };

    return { isProcessing, registrarMerma };
});