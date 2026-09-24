import { defineStore } from 'pinia';
import { ref } from 'vue'; // Asegúrate de importar ref
import { PromotionsService } from '../infrastructure/promotions.service.js';

export const usePromotionsStore = defineStore('promotions', () => {
    const service = new PromotionsService();
    const activePromotions = ref([]); // Lista reactiva para la tabla
    const isLoading = ref(false);

    const applyPromotionFromAi = async (recommendation) => {
        try {
            // AQUÍ ESTÁ LA MAGIA: Asegurándonos de enviar exactamente lo que C# pide.
            // Validamos si viene como 'reason' o como 'justificacion_ia' para evitar nulos.
            const justificacion = recommendation.reason || recommendation.justificacion_ia || "Justificación generada automáticamente por IA.";

            const dto = {
                producto_id: recommendation.productId || recommendation.id || 2,
                porcentaje_descuento: 20.00,
                justificacion_ia: justificacion
            };

            console.log('Enviando a C#:', dto); // Te ayudará a ver qué se envía en la consola (F12)

            const response = await service.applyDiscount(dto);
            return { success: true, message: response.data.message };
        } catch (error) {
            console.error('Error al aplicar la promoción:', error);
            return { success: false, message: 'Error al registrar la promoción en la base de datos.' };
        }
    };

    const fetchActivePromotions = async () => {
        isLoading.value = true;
        try {
            const response = await service.getActivePromotions();
            activePromotions.value = response.data;
        } catch (error) {
            console.error('Error al obtener promociones:', error);
        } finally {
            isLoading.value = false;
        }
    };

    return { activePromotions, isLoading, applyPromotionFromAi, fetchActivePromotions };
});