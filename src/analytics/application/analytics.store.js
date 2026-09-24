/**
 * @summary Gestor de estado para las predicciones de IA conectado a la API.
 * @author Gustavo Alonso Olivares Lao
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { AnalyticsService } from '../infrastructure/analytics.service.js';
import { AiAssembler } from '../infrastructure/ai.assembler.js';

export const useAnalyticsStore = defineStore('analytics', () => {
    const recommendations = ref([]);
    const isLoading = ref(false);

    const service = new AnalyticsService();
    const assembler = new AiAssembler();

    const fetchPredictions = async () => {
        isLoading.value = true;
        try {
            const response = await service.getPredictions();

            // Opción A: Si tu ensamblador se encarga de traducir el DTO
            recommendations.value = response.data.map(item => assembler.toEntity(item));

        } catch (error) {
            console.error('Error al obtener predicciones de IA:', error);
        } finally {
            isLoading.value = false;
        }
    };

    return { recommendations, isLoading, fetchPredictions };
});