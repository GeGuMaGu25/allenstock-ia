/**
 * @summary Gestor de estado para aplicar y listar campañas de descuento.
 * @author Gustavo Alonso Olivares Lao
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Promotion } from '../domain/model/promotion.entity.js';

export const usePromotionsStore = defineStore('promotions', () => {
    const activePromotions = ref([]);

    // Simula la escucha del evento RecomendacionAprobada
    const applyPromotionFromAi = (recommendation) => {
        const newPromo = new Promotion({
            id: Date.now(),
            producto_id: recommendation.productId,
            porcentaje_descuento: 20,
            estado: 'Activa'
        });
        activePromotions.value.push(newPromo);
        return { success: true, message: '¡Promoción activada en el catálogo!' };
    };

    return { activePromotions, applyPromotionFromAi };
});